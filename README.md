# jPopup #
### Simple lightweight (<2kB) and easy-to-use javascript popup plugin ###

### Another popop? ###
Yep, I needed simple as possible popup plugin for personal use, so jPopup was born.

### Demo ###

Demo available [here](https://robiveli.github.io/jpopup/).

### Install ###

With npm:
```
npm install jpopup --save
```

### Usage ###

Include required javascript:

```
import jPopup from 'jPopup';
```

Optionally, include stylings (or style it as you wish):
```
@import 'jPopup';
```

Define new instance and open popup:
```
<script>
    var myPopup = new jPopup({ // initialize jPopup
    	content: '<p>Lorem Ipsum...</p>'
        transition: 'fade',
        onOpen: function ($popupElement) {
            console.log('popup open');
        },
        onClose: function ($popupElement) {
            console.log('popup closed');
        }
    });

    myPopup.open(); // open popup
</script>
```

And that's that! Now you should see HTML markup in document tree:
```
<div class="jPopup jPopup--fade">
    <button type="button" class="jPopup-closeBtn"></button>
    <div class="jPopup-content"><p>Lorem Ipsum...</p></div>
</div>
```

### Options ###

jPopup can take just several parameters - an object of key/value settings:

 Name                | Required | Type          | Default     | Description |
| ---                | ---      | ---           | ---         | ---         |
| content                 | true     | [String]      | ''  | Content to display |
| transition                 | false     | [String]      | 'fade'  | Type of appearance animation. Possible animation transitions: 'fade', 'slideInFromTop', 'slideInFromBottom', 'slideInFromLeft' and 'slideInFromRight' |
| onOpen                 | false     | [Function]      | null  | Callback to execute when popup is open,  returned argument is popup (type: *Element*) |
| onClose                 | false     | [Function]      | null  | Callback to execute when popup is closed, returned argument is popup (type: *Element*)  |


### API ###

`open()` - open popup

`close()` - close popup

`setContent(content)` - set popup content (`@param {String}`)

`getContent()` - get popup content (`@return {String}`)

`destroy()` - destroy popup (remove from DOM and unbind events)


### Browser support ###

It works in every modern browser.

---

### License  ###

jPopup is licensed under the [MIT license](http://opensource.org/licenses/MIT).
