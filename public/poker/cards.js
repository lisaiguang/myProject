/**
 * Created by lenovo on 2015/8/27.
 */
/**
 * Created by lenovo on 2014/11/27.
 */
define(function(){
    var types = ['?','?','?','?'];
    var points = ['A','2','3','4','5','6','7','8','9','10','J','Q','K'];
    function Card(point, type){
        this.point = point;
        this.type = type;
    }
    Card.prototype.value = function(){
        var val = this.point;
        if(val < 1){
            val += 12;
        }else if(val < 13){
            val -= 1;
        }
        return val;
    }
    Card.prototype.getString = function(){
        return types[this.type] + points[this.point]
    }
    return {
        getCard:function(point, type){
            return new Card(point, type);
        }
    };
}, module);