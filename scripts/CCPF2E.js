// Register the module with Foundry VTT
Hooks.once('init', async function() {
    console.log('Custom Experience Currency | Initializing Custom Experience Currency Module');
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

// Update the character sheet to display the new Experience currency
Hooks.on('renderActorSheet', (app, html, data) => {
    const expValue = app.object.data.data.currency.exp;
    const expHtml = `<div class="currency exp"><label>Experience</label><input type="text" name="data.currency.exp" value="${expValue}" data-dtype="Number"></div>`;
    html.find('.currencies').append(expHtml);
});
