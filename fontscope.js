(function() {
    function generateElem(type, attr) {
        var elem = document.createElement(type);
        Object.keys(attr).forEach(function(a) {
            elem.setAttribute(a, attr[a]);
        });
        return elem;
    }

    function loadStyle(...args) {
        args.forEach(arg => {
            var elem = generateElem('link', {
                'rel': 'stylesheet',
                'href': arg
            });
            document.head.appendChild(elem);
        })
    }

    function generateImage(name, width, height) {
        name = 'images/' + name + '.svg';
        var elem = generateElem('img', {
            'width': width + 'px' || '',
            'height': height + 'px' || '',
            'src': name
        });
        return elem;
    }

    function getIcons() {
        var elems = document.querySelectorAll('span[class^=\'icon-\']');
        var outl = {};
        elems.forEach((elem) => {
            var x = elem.className.split(' ');
            var iconname = '';
            x.forEach(function(seg) {
                var m = seg.match(/icon-(.*)/g);
                if(m !== null && m[0] == seg) {
                    iconname = seg;
                }
            });
            if(typeof outl[iconname] !== 'undefined') {
                outl[iconname].push(elem);
            } else {
                outl[iconname] = [];
                outl[iconname].push(elem);
            }
        })
        return outl;
    }

    function start() {
        var icons = getIcons();
        loadStyle('css/fs.css')

        Object.keys(icons).forEach(icon => {
            icons[icon].forEach(i => {
                var elem = generateImage(icon, i.getAttribute('width'), i.getAttribute('height'));
                i.appendChild(elem);
            });
        });

        document.querySelectorAll('img.svg').forEach(function(img){
            var imgID = img.id;
            var imgClass = img.className;
            var imgURL = img.src;
        
            fetch(imgURL).then(function(response) {
                return response.text();
            }).then(function(text){
        
                var parser = new DOMParser();
                var xmlDoc = parser.parseFromString(text, "text/xml");
        
                // Get the SVG tag, ignore the rest
                var svg = xmlDoc.getElementsByTagName('svg')[0];
        
                // Add replaced image's ID to the new SVG
                if(typeof imgID !== 'undefined') {
                    svg.setAttribute('id', imgID);
                }
                // Add replaced image's classes to the new SVG
                if(typeof imgClass !== 'undefined') {
                    svg.setAttribute('class', imgClass+' replaced-svg');
                }
        
                // Remove any invalid XML tags as per http://validator.w3.org
                svg.removeAttribute('xmlns:a');
        
                // Check if the viewport is set, if the viewport is not set the SVG wont't scale.
                if(!svg.getAttribute('viewBox') && svg.getAttribute('height') && svg.getAttribute('width')) {
                    svg.setAttribute('viewBox', '0 0 ' + svg.getAttribute('height') + ' ' + svg.getAttribute('width'))
                }
        
                // Replace image with new SVG
                img.parentNode.replaceChild(svg, img);
        
            });
        
        });
    }

    window.addEventListener('load', start);
})();