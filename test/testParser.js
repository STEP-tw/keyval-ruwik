const src=function(filePath){return "../src/"+filePath};
const errors=function(filePath){return "../src/errors/"+filePath};
const chaiAssert = require('chai').assert;
const Parsed=require(src('parsed.js'));
const Parser=require(src('index.js')).Parser;
const MissingValueError=require(errors('missingValueError.js'));
const MissingEndQuoteError=require(errors('missingEndQuoteError.js'));
const MissingKeyError=require(errors('missingKeyError.js'));
const MissingAssignmentOperatorError=require(errors('missingAssignmentOperatorError.js'));
const IncompleteKeyValuePairError=require(errors('incompleteKeyValuePairError.js'));

var kvParser;

describe("parse basic key values",function(){
  beforeEach(function(){
    kvParser=new Parser();
  });

  it("parses an empty string",function(){
    let actual=kvParser.parse("");
    chaiAssert.equal(0,actual.length());
  });

  it("parse key=value",function(){
    let actual=kvParser.parse("key=value");
    chaiAssert.equal("value",actual.key);
    chaiAssert.equal(1,actual.length());
  });

  it("parse when there are leading spaces before key",function(){
    let actual=kvParser.parse(" key=value");
    let expected = new Parsed();
    expected['key']='value';
    chaiAssert.deepEqual(actual,expected);
  });

  it("parse when there are spaces after key",function(){
    let expected = new Parsed();
    expected['key']='value';
    chaiAssert.deepEqual(kvParser.parse("key =value"),expected);
  });

  it("parse when there are spaces before and after key",function(){
    let expected = new Parsed();
    expected['key']='value';
    chaiAssert.deepEqual(kvParser.parse(" key =value"),expected);
  });

  it("parse when there are spaces before value",function(){
    let expected = new Parsed();
    expected['key']='value';
    chaiAssert.deepEqual(kvParser.parse("key= value"),expected);
  });

  it("parse when there are spaces after value",function(){
    let expected = new Parsed();
    expected['key']='value';
    chaiAssert.deepEqual(kvParser.parse("key=value "),expected);
  });
});

describe("parse digits and other special chars",function(){
  beforeEach(function(){
    kvParser=new Parser();
  });

  it("parse keys with a single digit",function(){
    let expected = new Parsed();
    expected['1']='value';
    chaiAssert.deepEqual(kvParser.parse("1=value"),expected);
  });

  it("parse keys with only multiple digits",function(){
    let expected = new Parsed();
    expected['123']='value';
    chaiAssert.deepEqual(kvParser.parse("123=value"),expected);
  });

  it("parse keys with leading 0s",function(){
    let expected = new Parsed();
    expected['0123']='value';
    chaiAssert.deepEqual(kvParser.parse("0123=value"),expected);
  });

  it("parse keys with underscores",function(){
    let expected = new Parsed();
    expected['first_name']='value';
    chaiAssert.deepEqual(kvParser.parse("first_name=value"),expected);
  });

  it("parse keys with a single underscore",function(){
    let expected = new Parsed();
    expected['_']='value';
    chaiAssert.deepEqual(kvParser.parse("_=value"),expected);
  });

  it("parse keys with multiple underscores",function(){
    let expected = new Parsed();
    expected['__']='value';
    chaiAssert.deepEqual(kvParser.parse("__=value"),expected);
  });

  it("parse keys with alphabets and digits(digits leading)",function(){
    let expected = new Parsed();
    expected['0abc']='value';
    chaiAssert.deepEqual(kvParser.parse("0abc=value"),expected);
  });

  it("parse keys with alphabets and digits(alphabets leading)",function(){
    let expected = new Parsed();
    expected['a0bc']='value';
    chaiAssert.deepEqual(kvParser.parse("a0bc=value"),expected);
  });
});

describe("multiple keys",function(){
  beforeEach(function(){
    kvParser=new Parser();
  });

  it("parse more than one key",function(){
    let expected = new Parsed();
    expected['key']='value';
    expected['anotherkey']= "anothervalue";
    chaiAssert.deepEqual(kvParser.parse("key=value anotherkey=anothervalue"),expected);
  });

  it("parse more than one key when keys have leading spaces",function(){
    let expected = new Parsed();
    expected['key']='value';
    expected['anotherkey']= "anothervalue";
    chaiAssert.deepEqual(kvParser.parse("   key=value anotherkey=anothervalue"),expected);
  });

  it("parse more than one key when keys have trailing spaces",function(){
    let expected = new Parsed();
    expected['key']='value';
    expected['anotherkey']= "anothervalue";
    chaiAssert.deepEqual(kvParser.parse("key  =value anotherkey  =anothervalue"),expected);
  });

  it("parse more than one key when keys have leading and trailing spaces",function(){
    let expected = new Parsed();
    expected['key']='value';
    expected['anotherkey']= "anothervalue";
    chaiAssert.deepEqual(kvParser.parse("  key  =value anotherkey  =anothervalue"),expected);
  });
});

describe("single values with quotes",function(){
  beforeEach(function(){
    kvParser=new Parser();
  });

  it("parse a single value with quotes",function(){
    let expected = new Parsed();
    expected['key']='value';
    chaiAssert.deepEqual(kvParser.parse("key=\"value\""),expected);
  });

  it("parse a single quoted value that has spaces in it",function(){
    let expected = new Parsed();
    expected['key']='va lue';
    chaiAssert.deepEqual(kvParser.parse("key=\"va lue\""),expected);
  });

  it("parse a single quoted value that has spaces in it and leading spaces",function(){
    let expected = new Parsed();
    expected['key']='va lue';
    chaiAssert.deepEqual(kvParser.parse("key=   \"va lue\""),expected);
  });

  it("parse a single quoted value that has spaces in it and trailing spaces",function(){
    let expected = new Parsed();
    expected['key']='va lue';
    chaiAssert.deepEqual(kvParser.parse("key=\"va lue\"   "),expected);
  });
});

describe("multiple values with quotes",function(){
  it("parse more than one value with quotes",function(){
    let expected = new Parsed();
    expected['key']='va lue';
    expected['anotherkey']= "another value";
    chaiAssert.deepEqual(kvParser.parse("key=\"va lue\" anotherkey=\"another value\""),expected);
  });

  it("parse more than one value with quotes with leading spaces",function(){
    let expected = new Parsed();
    expected['key']='va lue';
    expected['anotherkey']= "another value";
    chaiAssert.deepEqual(kvParser.parse("key= \"va lue\" anotherkey= \"another value\""),expected);
  });

  it("parse more than one value with quotes when keys have trailing spaces",function(){
    let expected = new Parsed();
    expected['key']='va lue';
    expected['anotherkey']= "another value";
    chaiAssert.deepEqual(kvParser.parse("key = \"va lue\" anotherkey = \"another value\""),expected);
  });
});

describe("mixed values with both quotes and without",function(){
  it("parse simple values with and without quotes",function(){
    let expected = new Parsed();
    expected['key']='value';
    expected['anotherkey']= "anothervalue";
    chaiAssert.deepEqual(kvParser.parse("key=value anotherkey=\"anothervalue\""),expected);
  });

  it("parse simple values with and without quotes and leading spaces on keys",function(){
    let expected = new Parsed();
    expected['key']='value';
    expected['anotherkey']= "anothervalue";
    chaiAssert.deepEqual(kvParser.parse("   key=value anotherkey=\"anothervalue\""),expected);
  });

  it("parse simple values with and without quotes and trailing spaces on keys",function(){
    let expected = new Parsed();
    expected['key']='value';
    expected['anotherkey']= "anothervalue";
    chaiAssert.deepEqual(kvParser.parse("key  =value anotherkey  =\"anothervalue\""),expected);
  });

  it("parse simple values with and without quotes and leading and trailing spaces on keys",function(){
    let expected = new Parsed();
    expected['key']='value';
    expected['anotherkey']= "anothervalue";
    chaiAssert.deepEqual(kvParser.parse("  key  =value anotherkey  = \"anothervalue\""),expected);
  });

  it("parse simple values with and without quotes(quoted values first)",function(){
    let expected = new Parsed();
    expected['key']='value';
    expected['anotherkey']= "anothervalue";
    chaiAssert.deepEqual(kvParser.parse("anotherkey=\"anothervalue\" key=value"),expected);
  });
});

const errorChecker=function(key,pos,typeOfError) {
    return function(err) {
      if(err instanceof typeOfError && err.key==key && err.position==pos)
        return true;
      return false;
    }
}

describe("error handling",function(){
  beforeEach(function(){
    kvParser=new Parser();
  });

  it("throws error on missing value when value is unquoted",function(){
    chaiAssert.throws(
      () => {
        try{
          kvParser.parse("key=")
        } catch(e){
          if(errorChecker("key",3,MissingValueError))
            throw(e)
        }
      })
  });

  it("throws error on missing value when value is quoted",function(){
    chaiAssert.throws(
      () => {
        try{
          kvParser.parse("key=\"value")
        } catch(e){
          if(errorChecker("key",9,MissingEndQuoteError))
            throw(e)
        }
      }
    )
  });

  it("throws error on missing key",function(){
    chaiAssert.throws(
      () => {
        try{
          var p=kvParser.parse("=value");
        } catch(e){
          if(errorChecker(undefined,0,MissingKeyError))
            throw(e)
        }
      }
    )
  });

  it("throws error on invalid key",function(){
    chaiAssert.throws(
      () => {
        try{
          var p=kvParser.parse("'foo'=value");
        } catch(e){
          if(errorChecker(undefined,0,MissingKeyError))
            throw(e)
        }
      }
    )
  });

  it("throws error on missing assignment operator",function(){
    chaiAssert.throws(
      () => {
        try{
          var p=kvParser.parse("key value");
        } catch(e){
          if(errorChecker(undefined,4,MissingAssignmentOperatorError))
            throw(e)
        }
      }
    )
  });

  it("throws error on incomplete key value pair",function(){
    chaiAssert.throws(
      () => {
        try{
          var p=kvParser.parse("key");
        }catch(e){
          if(errorChecker(undefined,2,IncompleteKeyValuePairError))
            throw(e)
        }
      }
    )
  });

});
