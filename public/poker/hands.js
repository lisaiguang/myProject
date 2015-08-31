/**
 * Created by gapp on 8/27/15.
 */
define(function(){
    var valueTypes = [1/*����*/,2/*����*/,3/*����*/,4/*����*/,5/*˳��*/,6/*ͬ��*/,7/*��«*/,8/*����*/,9/*ͬ��˳*/,10/*�ʼ�ͬ��˳*/];
    function compare(hand){
        var v0 = this.getValue(), v1 = hand.getValue();
        if(v0.type > v1.type) return 1;
        if(v0.type == v1.type) return v0.value > v1.value ? 1 : (v0.value == v1.value ? 0 : -1);
        return -1;
    }
    function getFlush(){
        var cards = this, diamonds = [], clubs = [], hearts = [], spades = [];
        for(var i = 0; i < cards.length; i++){
            var card = cards[i];
            if(card.type == 0) diamonds.push(card);
            else if(card.type == 1)clubs.push(card);
            else if(card.type == 2)hearts.push(card);
            else if(card.type == 3)spades.push(card);
        }
        if(diamonds.length >= 5) return diamonds;
        if(clubs.length >= 5) return clubs;
        if(hearts.length >= 5) return hearts;
        if(spades.length >= 5) return spades;
    }
    function getValue(){
        var cards = this, sta = this.getStatistic(), keys = sta.keys;
    }
    //private
    function _getFive(sta){
        var kvs = sta.keyValues.concat(), maxKey = sta.maxKey, maxLevel = sta.maxLevel, count = 5, l0 = [];
        while(maxLevel-- && count){
            for(var i = maxKey; i >= 0; i--){
                var vl = kvs[maxKey];
                if(vl.length == maxLevel){
                    var l1 = vl.splice(0, Math.max(maxLevel, count));
                    l0.push(l1);
                    count -= l1.length;
                }
            }
        }
        return l0;
    }
    //private
    function _getValue(sta){
        var len = sta.maxKey, kvs = sta.keyValues, point = 0;
        for(var i = 0; i < len; i++){

        }
    }
    function sort(){
        var l = this;
        for (var i = 0; i < l.length - 1; i++) {
            var f = true;
            for (var j = l.length - 1; j > i; j--) {
                var jv = l[j].getValue(), j1v = l[j - 1].getValue();
                if (jv < j1v || (jv == j1v && l[j - 1].type > l[j].type)) {
                    var t = l[j];
                    l[j] = l[j - 1];
                    l[j - 1] = t;
                    f = false;
                }
            }
            if (f)break;
        }
    }
    function getStatistic(){
        var cards = this, l = [], maxKey = -1, maxLevel = 1;
        for(var i = 0; i < cards.length; i++){
            var card = cards[i], v = card.getValue();
            if(l[v]){
                var level = l[v].push(card);
                if(level > maxLevel){
                    maxLevel = level;
                }
            }else{
                l[v] = [card];
                if(v > maxKey){
                    maxKey = v;
                }
            }
        }
        return {keyValues:l, maxLevel:maxLevel, maxKey:maxKey};
    }
    var hands = function(cards){
        cards.compare = compare;
        cards.getValue = getValue;
        cards.getStatistic = getStatistic;
        cards.sort = sort;
        cards.getFlush = getFlush;
        return cards;
    };
    hands.getInstance = function() {
        return this([]);
    };
    return hands;
},module);