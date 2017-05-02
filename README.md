# jPopup #
### Simple lightweight javascript popup modal plugin ###

### Another popop? ###
Yep, I needed simple as possible modal plugin for personal use, so jPopup was born.

### Install ###

With npm:
```sh
npm install jpopup
```

With Bower:
```sh
bower install jpopup
```

### Usage ###

Include required javascript:
```sh
<script src="jPopup.js"></script>
```

Include css:
```sh
<link href='jPopup.css' rel='stylesheet' type='text/css'>
```
Initialize jPopup:
```sh
<script>
    var myPopup = new jPopup({
    	contentHtml: '<p>My popup text</p>'
    });
</script>
```

### Demo ###

Demo available [here](http://www.rvdizajn.com/jpopup/).

### Example ###

```sh
<script>
    document.querySelector('.openPopup').addEventListener('click', function() {

        var jPopupDemo = new jPopup({

            contentHtml: '<strong>Hurray</strong>\
                    <p>You can put any content you want here.</p>'

        });

    });
</script>
```

Default css settings are placed in `/sass/library/_setup.scss`:

- **$baseBreakpoint** *(default:680px)* - media query breakpoint value
- **$bgColor** *(default:#fff)* - popup background color
- **$closeBtnColor** *(default:#adadad)* - color of close button


### API ###

`close()` - close popup


### License  ###

jPopup is licensed under the [MIT license](http://opensource.org/licenses/MIT).
