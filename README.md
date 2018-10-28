# jPopup #
### Simple lightweight (<2kB) javascript popup modal plugin ###

### Another popop? ###
Yep, I needed simple as possible modal plugin for personal use, so jPopup was born.

### Install ###

With npm:
```
npm install jpopup --save
```

### Usage ###

Include required javascript:
```
<script src="jPopup.js"></script>
```
or
```
import jPopup from 'jPopup';
```

Include css:
```
<link href='jPopup.min.css' rel='stylesheet' type='text/css'>
```
or
```
@import "jPopup";
```

Initialize jPopup (popup opened immediately):
```
<script>
    var myPopup = new jPopup({
    	content: '<p>My popup text</p>',
        hashtagValue: '#mypopup'
    });
</script>
```

### Demo ###

Demo available [here](https://www.rvdizajn.com/jpopup/).


### Options ###

jPopup can take an optional parameters - an object of key/value settings:

- **content** String *(required)* - string of content to display
- **shouldSetHash** Boolean *(default:true)* - should popup append hashtag in the current url (applied [History API](https://developer.mozilla.org/en-US/docs/Web/API/History_API))
- **hashtagValue** String *(default:`#popup`)* - value of the appended hashtag (if value provided, no need to define `shouldSetHash`)

Default css styling are placed in `/sass/library/_setup.scss`:

- **$baseBreakpoint** *(default:680px)* - media query breakpoint value
- **$bgColor** *(default:#fff)* - popup background color
- **$closeBtnColor** *(default:#adadad)* - base color of close button


### API ###

`open()` - open popup (invoked immediately by creating new popup instance)

`close()` - close popup

For example:
```
<script>

    var jPopupDemo = new jPopup({

        content: 'Lorem Ipsum...'

    });

    setInterval(function() {

        jPopupDemo.close();

    }, 2000);

</script>
```


### Browser support ###

It works in every modern browser where [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) and [classList](https://developer.mozilla.org/en-US/docs/Web/API/Element/classList) are supported.

Consider using polyfills for [Promise](https://github.com/stefanpenner/es6-promise) and [classList](https://github.com/eligrey/classList.js/) features if needed.


### License  ###

jPopup is licensed under the [MIT license](http://opensource.org/licenses/MIT).
