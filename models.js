const mongoose = require('mongoose');

const entrySchema = mongoose.Schema({
  date: {type: Date, default: Date.now},
  teaName: {type: String, required: true},
  vendor: String,
  teaColorTeaType: String,
  flavoredTeaType: Boolean,
  creamAdditions: Boolean,
  sugarAdditions: Boolean,
  honeyAdditions: Boolean,
  lemonAdditions: Boolean,
  otherAdditions: String,
  aroma: String,
  taste: String,
  stars: {type: Number, min: 0, max: 5},
  notes: String
});

entrySchema.methods.apiRepr = function() {
  return {
    id: this._id,
    teaName: this.teaName,
    date: this.date,
    vendor: this.vendor,
    teaColorTeaType: this.teaColorTeaType,
    flavoredTeaType: this.flavoredTeaType,
    creamAdditions: this.creamAdditions,
    sugarAdditions: this.sugarAdditions,
    honeyAdditions: this.honeyAdditions,
    lemonAdditions: this.lemonAdditions,
    otherAdditions: this.otherAdditions,
    aroma: this.aroma,
    taste: this.taste,
    stars: this.stars,
    notes: this.notes
  };
}

const Entry = mongoose.model('Entry', entrySchema);

module.exports = {Entry};
