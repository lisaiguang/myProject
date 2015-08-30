/**
 * Created by lenovo on 2015/8/27.
 */
/**
 * Created by lenovo on 2014/11/27.
 */
define(function(){
    var types = ['?','?','?','?'];
    var points = ['A','2','3','4','5','6','7','8','9','10','J','Q','K'];
    function getValue(){
        var val = this.point;
        if(val < 1){
            val += 12;
        }else if(val < 13){
            val -= 1;
        }
        return val;
    }

    function compare(card){
        var v1 = this.getValue(), v2 = card.getValue();
        if(v1==v2)return 0;
        if(v1 < v2)return -1;
        if(v1 > v2)return 1;
    }

    function toString(){
        return types[this.type] + points[this.point]
    }

    var cards = function(card){
        card.compare = compare;
        card.getValue = getValue;
        card.toString = toString;
        return card;
    };
    cards.getInstance = function(point,type){
        return this({point:point, type:type});
    };
    return cards;
}, module);