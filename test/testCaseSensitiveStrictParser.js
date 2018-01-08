const src=function(filePath){return "../src/"+filePath};

const assert=require('chai').assert;
const Parsed=require(src('parsed.js'));
const StrictParser=require(src('index.js')).StrictParser;

describe("strict parser that is case insensitive",function(){
  it("should parse when specified keys are in lower case and actual is not",function(){
    let kvParser=new StrictParser(["name"],false);
    // false indicates that case sensitive is false. By default it is true
    let expected=new Parsed();
    expected["NAME"]="manindra";
    let parsed=kvParser.parse("NAME=manindra");
    assert.deepEqual(parsed,expected);
  });
  it('should parse when specified keys are in upper case and actual is not',function(){
    let kvParser=new StrictParser(["NAME"],false);
    let expected=new Parsed();
    expected["name"]="manindra";
    let parsed=kvParser.parse("name=manindra");
    assert.deepEqual(parsed,expected);
  })
  it('should parse when specified keys are in irregular case and actual is not',function(){
    let kvParser=new StrictParser(["NAme"],false);
    let expected=new Parsed();
    expected["name"]="manindra";
    let parsed=kvParser.parse("name=manindra");
    assert.deepEqual(parsed,expected);
  });
  it('should parse when specified keys are in lower case and actual is irregular',function(){
    let kvParser=new StrictParser(["name"],false);
    let expected=new Parsed();
    expected["Name"]="manindra";
    let parsed=kvParser.parse("Name=manindra");
    assert.deepEqual(parsed,expected);
  });
  it('should parse when specified keys are in upper case and actual is irregular',function(){
    let kvParser=new StrictParser(["NAME"],false);
    let expected=new Parsed();
    expected["Name"]="manindra";
    let parsed=kvParser.parse("Name=manindra");
    assert.deepEqual(parsed,expected);
  })
});

describe("strict parser that is case insensitive for multiple keys",function(){
  it("should parse when specified keys are in lower case and actual is not",function(){
    let kvParser=new StrictParser(["name",'age'],false);
    let expected=new Parsed();
    expected["NAME"]="manindra";
    expected['AGE']="19"
    let parsed=kvParser.parse("NAME=manindra AGE=19");
    assert.deepEqual(parsed,expected);
  });
  it('should parse when specified keys are in upper case and actual is not',function(){
    let kvParser=new StrictParser(["NAME","AGE"],false);
    let expected=new Parsed();
    expected["name"]="manindra";
    expected["age"]="19";
    let parsed=kvParser.parse("name=manindra age=19");
    assert.deepEqual(parsed,expected);
  })
  it('should parse when specified keys are in irregular case and actual is not',function(){
    let kvParser=new StrictParser(["NAme","AgE"],false);
    let expected=new Parsed();
    expected["name"]="manindra";
    expected['age']="19"
    let parsed=kvParser.parse("name=manindra age=19");
    assert.deepEqual(parsed,expected);
  });
  it('should parse when specified keys are in lower case and actual is irregular',function(){
    let kvParser=new StrictParser(["name","age"],false);
    let expected=new Parsed();
    expected["Name"]="manindra";
    expected['Age']='19'
    let parsed=kvParser.parse("Name=manindra Age=19");
    assert.deepEqual(parsed,expected);
  });
  it('should parse when specified keys are in upper case and actual is irregular',function(){
    let kvParser=new StrictParser(["NAME","AGE"],false);
    let expected=new Parsed();
    expected["Name"]="manindra";
    expected['Age']='19'
    let parsed=kvParser.parse("Name=manindra Age=19");
    assert.deepEqual(parsed,expected);
  })
  it('should parse when specified keys have their respective cases',function(){
    let kvParser=new StrictParser(["NAME","age"],false);
    let expected=new Parsed();
    expected["Name"]="manindra";
    expected['Age']='19'
    let parsed=kvParser.parse("Name=manindra Age=19");
    assert.deepEqual(parsed,expected);
  })
})

describe("strict parser that is case insensitive",function(){
  it('should parse when specified keys have their respective cases and numbers',function(){
    let kvParser=new StrictParser(["NAME1","2age"],false);
    let expected=new Parsed();
    expected["Name1"]="manindra";
    expected['2Age']='19'
    let parsed=kvParser.parse("Name1=manindra 2Age=19");
    assert.deepEqual(parsed,expected);
  })
  it("should parse when specified keys are in lower case and have numbers and actual is not",function(){
    let kvParser=new StrictParser(["0name",'0age'],false);
    let expected=new Parsed();
    expected["0NAME"]="manindra";
    expected['0AGE']="19"
    let parsed=kvParser.parse("0NAME=manindra 0AGE=19");
    assert.deepEqual(parsed,expected);
  });
  it('should parse when specified keys are in upper case and have numbers and actual is not',function(){
    let kvParser=new StrictParser(["1NAME","1AGE"],false);
    let expected=new Parsed();
    expected["1name"]="manindra";
    expected["1age"]="19";
    let parsed=kvParser.parse("1name=manindra 1age=19");
    assert.deepEqual(parsed,expected);
  })
  it('should parse when specified keys are in irregular case and have numbers and actual is not',function(){
    let kvParser=new StrictParser(["2NAme","2AgE"],false);
    let expected=new Parsed();
    expected["2name"]="manindra";
    expected['2age']="19"
    let parsed=kvParser.parse("2name=manindra 2age=19");
    assert.deepEqual(parsed,expected);
  });
  it('should parse when specified keys are in lower case and have numbers and actual is irregular',function(){
    let kvParser=new StrictParser(["3name","3age"],false);
    let expected=new Parsed();
    expected["3Name"]="manindra";
    expected['3Age']='19'
    let parsed=kvParser.parse("3Name=manindra 3Age=19");
    assert.deepEqual(parsed,expected);
  });
  it('should parse when specified keys are in upper case and have numbers and actual is irregular',function(){
    let kvParser=new StrictParser(["4NAME","4AGE"],false);
    let expected=new Parsed();
    expected["4Name"]="manindra";
    expected['4Age']='19'
    let parsed=kvParser.parse("4Name=manindra 4Age=19");
    assert.deepEqual(parsed,expected);
  })
})

describe("strict parser that is case sensitive",function(){
  it("should throw error when specified keys are in lower case and actual is not",function(){
    let kvParser=new StrictParser(["name"],true);
    assert.throws(()=>{
      kvParser.parse("NAME=manindra");
    })
  });
});

describe("strict parser when bool is not passed should take true as default",function(){
  it("should throw error when specified keys are in lower case and actual is not",function(){
    let kvParser=new StrictParser(["name"]);
    assert.throws(()=>{
      kvParser.parse("NAME=manindra");
    })
  });
});
