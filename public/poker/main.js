/**
 * Created by gapp on 8/27/15.
 */
define(function(require){
    var Card = require('cards');
    var Hand = require('hands');
    var list = [];
    for (var i = 0; i < 52; i++) {
        list.push(Card.getInstance(i % 13, Math.floor(i / 13)));
    }
    var cards = Hand.getInstance();
    for (var i = 0; i < 7; i++) {
        var index = Math.floor(Math.random() * list.length);
        var card = list[index];
        list.splice(index, 1);
        cards.push(card);
    }
    var str = '您获得：<br>'
    for(var i = 0; i < cards.length; i++){
        str += cards[i].toString()+',';
    }
    str+='<br>类型结果如下：<br>';
    str += JSON.stringify(cards.getValue());
    document.write(str);
})