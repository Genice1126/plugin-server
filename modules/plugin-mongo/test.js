const mongoose = require('./index.js');
const mon = require('mongoose');
console.log(typeof "hello world");
let schema = mongoose.test;

(async function(){
  let res = await schema.find({
      name : 'hello'
  });

  let tx = {
    "_id" : "5eb60393571ed8b795155661",
    "list" : [ 
        {
            "type" : "input",
            "icon" : "icon-input",
            "options" : {
                "width" : "100%",
                "defaultValue" : "asdfasdfasdf",
                "required" : false,
                "dataType" : "string",
                "pattern" : "",
                "placeholder" : "",
                "disabled" : false,
                "remoteFunc" : "func_1585101001000_31889"
            },
            "name" : "单行文本",
            "key" : "1585101001000_31889",
            "model" : "aaa",
            "rules" : [ 
                {
                    "type" : "string",
                    "message" : "单行文本格式不正确"
                }
            ]
        }, 
        {
            "type" : "radio",
            "icon" : "icon-radio-active",
            "options" : {
                "inline" : false,
                "defaultValue" : "",
                "showLabel" : false,
                "options" : [ 
                    {
                        "value" : "Option 1",
                        "label" : "Option 1"
                    }, 
                    {
                        "value" : "Option 2",
                        "label" : "Option 2"
                    }, 
                    {
                        "value" : "Option 3",
                        "label" : "Option 3"
                    }
                ],
                "required" : false,
                "width" : "",
                "remote" : false,
                "remoteOptions" : [],
                "props" : {
                    "value" : "value",
                    "label" : "label"
                },
                "remoteFunc" : "func_1585101124000_54855",
                "disabled" : false
            },
            "name" : "单选框组",
            "key" : "1585101124000_54855",
            "model" : "radio_1585101124000_54855",
            "rules" : []
        }, 
        {
            "type" : "rate",
            "icon" : "icon-pingfen1",
            "options" : {
                "defaultValue" : 0,
                "max" : 5,
                "disabled" : false,
                "allowHalf" : false,
                "required" : false,
                "remoteFunc" : "func_1585101133000_1116"
            },
            "name" : "评分",
            "key" : "1585101133000_1116",
            "model" : "rate_1585101133000_1116",
            "rules" : []
        }
    ],
    "config" : {
        "labelWidth" : 80,
        "labelPosition" : "right",
        "size" : "medium"
    },
    "__v" : 0
}

  console.log('res==>' , res);
  let info = await mongoose.genice_find('yoyo' , {_id : mon.Types.ObjectId('5eb604bdbd1089b7b8f4f7be')});
  console.log('info==>' , info);
  // await mongoose.genice_save('yoyo' , {ty : "hello" , pe : "world"});
  // await mongoose.genice_update('yoyo' , {name : "hello" , num : 1} , {type : "oooo"});
  // await mongoose.genice_update('yoyo' , {name : "hello" , num : {$gt : 2}} , {type : "uhy"});
  // await mongoose.genice_remove('yoyo' , {num : 2});
  // let res = await mongoose.genice_find('yoyo' , {type : "oooo"});
  // console.log('res==>' , res);
})();

