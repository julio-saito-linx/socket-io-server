
exports.Registry = function (defaultValue){
  this._defaultValue = defaultValue;
  this._values = Object.create(null);
}
 
exports.Registry.prototype.register = function(name, value){
  this._values[name] = value;
};

exports.Registry.prototype.unregister = function(name){
  delete this._values[name];
};
 
exports.Registry.prototype.getValue = function(name){
  var value;
  if (Object.prototype.hasOwnProperty.call(this._values, name)){
    value = this._values[name];
  } else {
    value = this._defaultValue;
  }
  return value;
};