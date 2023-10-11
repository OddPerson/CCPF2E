// Register the module with Foundry VTT
Hooks.once('init', async function() {
    console.log('Custom Experience Currency | Initializing Custom Experience Currency Module');
});

Hooks.once('init', () => {
    // Register the template override
    CONFIG.TEMPLATES['systems']['pf2e']['templates']['actors']['partials']['coinage.hbs'] = 'modules/custom-currency-XP/templates/custom-coinage.hbs';

    // Register custom localization
    game.i18n.loadStrings({
        "CustomCurrency.ExperienceLabel": "Experience",
        "CustomCurrency.ExperienceTitle": "Experience Points"
    });
});

// Define a new currency type for Experience
class ExperienceCurrency {
    constructor(actorData) {
        this.actorData = actorData;
    }

    get value() {
        return this.actorData.data.currency.exp || 0;
    }

    set value(newValue) {
        this.actorData.update({'data.currency.exp': newValue});
    }

    add(amount) {
        this.value += amount;
    }

    subtract(amount) {
        this.value = Math.max(0, this.value - amount);
    }
}

// Extend the existing Actor class to support the new Experience currency
class CustomActor extends Actor {
    prepareData() {
        super.prepareData();
        this.data.currency.exp = this.data.currency.exp || 0;
    }
}

// Register the extended Actor class
CONFIG.Actor.entityClass = CustomActor;

