const mongoose = require('mongoose');

const logSchema = mongoose.Schema({
  teaName: {type: String, required: true},
  date: {type: Date, default: Date.now},
  vendor: String,
  teaType: {
    teaColor: String,
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

logSchema.methods.apiRepr = function() {
  return {
    id: this._id,
    teaName: this.teaName,
    date: this.date,
    vendor: this.vendor,
    teaType.teaColor: this.teaType.teaColor,
    teaType.flavored: this.teaType.flavored,
    amountUsed: this.amountUsed,
    waterUsed: this.waterUsed,
    brewTemp: this.brewTemp,
    steepingTime: this.steepingTime,
    additions.cream: this.additions.cream,
    additions.sugar: this.additions.sugar,
    additions.honey: this.additions.honey,
    additions.lemon: this.additions.lemon,
    additions.other: this.additions.other,
    aroma: this.aroma,
    taste: this.taste,
    stars: this.stars,
    notes: this.notes
  };
}

const Logs = mongoose.model('Logs', logSchema);

module.exports = {Logs};
