'use strict';

(function() {

    var graph = new joint.dia.Graph;
    var paper = new joint.dia.Paper({
        el: $('#paper').css('width', 800),
        width: 800,
        height: 600,
        gridSize: 1,
        model: graph
    });

    var stencil = new joint.ui.Stencil({ 
        graph: graph, 
        paper: paper,
        width: 200,
        height: 200
    });
    var diamond = new joint.shapes.basic.Path({
        size: { width: 70, height: 70 },
        position : {x:100,y:70},
        attrs: {
            path: { d: 'M 30 0 L 60 30 30 60 0 30 z' },
            text: {
                text: 'Decision',
                
            }
        }
    });
    $('#stencil-container').append(stencil.render().el);

    var r = new joint.shapes.basic.Rect({ 
        position: { x: 10, y: 10 }, size: { width: 70, height: 40 },
        attrs: { rect: { fill: '#31D0C6',rx:30,ry:30}, text: { text: 'Start', fill: 'white' } ,magnet:true}
    });
    
    var c = new joint.shapes.basic.Rect({ 
        position: { x: 100, y: 10 }, size: { width: 70, height: 40 },
        attrs: { rect: { fill: '#31D0C6',rx:30,ry:30}, text: { text: 'Stop', fill: 'white' },magnet:true }
    });

    var c2 = new joint.shapes.basic.Rect({ 
        position: { x: 10, y: 70 }, size: { width: 70, height: 40 },
        attrs: { rect: { fill: '#4B4A67' }, text: { text: 'Step', fill: 'white' },magnet:true }
    });
    
    paper.on('cell:pointerup', function(cellView) {
        // We don't want a Halo for links.
        if (cellView.model instanceof joint.dia.Link) return;

        var halo = new joint.ui.Halo({ cellView: cellView });
        halo.render();
    });

    stencil.load([r, c, c2,diamond]);
    
    
    
    
    
    
})();