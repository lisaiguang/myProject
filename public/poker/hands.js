/**
 * Created by gapp on 8/27/15.
 */
define(function(){
    var valueTypes = [1/*高牌*/,2/*对子*/,3/*两队*/,4/*三条*/,5/*顺子*/,6/*同花*/,7/*葫芦*/,8/*四条*/,9/*同花顺*/,10/*皇家同花顺*/];
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
        var cards = this, l = [], keys = [], maxKey = -1;
        for(var i = 0; i < cards.length; i++){
            var card = cards[i], v = card.getValue();
            if(l[v]){
                l[v].push(card);
            }else{
                l[v] = [card];
                keys.push(v);
                if(v > maxKey){
                    maxKey = v;
                }
            }
        }
        return {keyValues:list, keys:keys, maxKey:maxKey};
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