const Parsed=require("./parsed.js");
const ParseInfo=require("./parseInfo.js");
const InvalidKeyError=require("./errors/invalidKeyError.js");

const contains=function(list,key) {
  return list.find(function(validKey){
    return key==validKey;
  });
}

var StrictParseInfo=function(initialParsingFunction,validKeys,caseSensitivity) {
  ParseInfo.call(this,initialParsingFunction);
  this.validKeys=validKeys;
  this.caseSensitive = caseSensitivity;
}

StrictParseInfo.prototype=Object.create(ParseInfo.prototype);

StrictParseInfo.prototype.pushKeyValuePair=function() {
  let currentKey = this.currentKey;
  let validKeysList = this.validKeys;
  if(!this.caseSensitive) {
    currentKey = this.currentKey.toLowerCase();
    validKeysList = validKeysList.map(function(element){return element.toLowerCase()});
  }
  if(!contains(validKeysList,currentKey))
    throw new InvalidKeyError("invalid key",this.currentKey,this.currentPos);
  this.parsedKeys[this.currentKey]=this.currentValue;
  this.resetKeysAndValues();
}

module.exports=StrictParseInfo;
