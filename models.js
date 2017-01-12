const mongoose = require('mongoose');

const tastingsSchema = mongoose.Schema({
  teaName: {type: String, required: true},
  date: {type: Date, default: Date.now},
  vendor: String,
  teaType: {
    teaColor: Array,
    flavored: Boolean
  },
  amountUsed: String,
  waterUsed: String,
  brewTemp: String,
  steepingTime: String,
  additions: {
        cream: Boolean,
        sugar: String,
        honey: Boolean,
        lemon: Boolean,
        other: String
        },
  aroma: String,
  taste: String,
  stars: {type: Number, min: 1, max: 5},
  notes: String
});

tastingsSchema.methods.apiRepr = function() {
  return {
    id: this._id,
    teaName: this.teaName,
    date: this.date,
    vendor: this.vendor,
    teaColorTeaType: this.teaType.teaColor,
    flavoredTeaType: this.teaType.flavored,
    amountUsed: this.amountUsed,
    waterUsed: this.waterUsed,
    brewTemp: this.brewTemp,
    steepingTime: this.steepingTime,
    creamAdditions: this.additions.cream,
    sugarAdditions: this.additions.sugar,
    honeyAdditions: this.additions.honey,
    lemonAdditions: this.additions.lemon,
    otherAdditions: this.additions.other,
    aroma: this.aroma,
    taste: this.taste,
    stars: this.stars,
    notes: this.notes
  };
}

const Tasting = mongoose.model('Tasting', tastingsSchema);

module.exports = {Tasting};
