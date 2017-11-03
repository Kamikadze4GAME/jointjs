/**
 * Sample code to create a workflow builder in Rappid Framework
 * 
 * @author Krunal Nanda
 * 
 */

(function() {
	
	/*Create graph and paper*/
	
    var graph = new joint.dia.Graph;
    var paper = new joint.dia.Paper({
        el: $('#paper').css('width', 800),
        width: 800,
        height: 600,
        gridSize: 1,
        model: graph
    });

    /* Initialize stencil to add items for drag and drop */
    
    var stencil = new joint.ui.Stencil({ 
        graph: graph, 
        paper: paper,
        width: 200,
        height: 200
    });
   
    $('#stencil-container').append(stencil.render().el);
    
    //Create shapes
    
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
    var fd = new joint.shapes.basic.Rect({ 
        position: { x: 10, y: 140 }, size: { width: 70, height: 40 },
        attrs: { rect: { fill: '#4B4A67' }, text: { text: 'Feedback', fill: 'white' },magnet:true }
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
    
    
    // Set Halo to the elements for linking, deleting and resizing
    
    paper.on('cell:pointerup', function(cellView) {
        // We don't want a Halo for links.
        if (cellView.model instanceof joint.dia.Link) return;

        var halo = new joint.ui.Halo({ cellView: cellView });
        halo.render();
    });

    stencil.load([r, c, c2,diamond,fd]);
    
    //Prefined elements and linked for sample workflow
    
    var r1 = new joint.shapes.basic.Rect({ 
        position: { x: 100, y: 10 }, size: { width: 70, height: 40 },
        attrs: { rect: { fill: '#31D0C6',rx:30,ry:30}, text: { text: 'Start', fill: 'white' } ,magnet:true}
    });
    var r2 = new joint.shapes.basic.Rect({ 
        position: { x: 100, y: 400 }, size: { width: 70, height: 40 },
        attrs: { rect: { fill: '#31D0C6',rx:30,ry:30}, text: { text: 'Stop', fill: 'white' },magnet:true }
    });
    
    var r3 = new joint.shapes.basic.Rect({ 
        position: { x: 100, y: 100 }, size: { width: 70, height: 40 },
        attrs: { rect: { fill: '#4B4A67' }, text: { text: 'Step', fill: 'white' },magnet:true }
    });
    
    
    var d2 = new joint.shapes.basic.Path({
        size: { width: 70, height: 70 },
        position : {x:100,y:200},
        attrs: {
            path: { d: 'M 30 0 L 60 30 30 60 0 30 z' },
            text: {
                text: 'Decision',
                
            }
        }
    });
    
    var r4 = new joint.shapes.basic.Rect({ 
        position: { x: 100, y: 300 }, size: { width: 70, height: 40 },
        attrs: { rect: { fill: '#4B4A67' }, text: { text: 'Step', fill: 'white' },magnet:true }
    });
    
    var r5 = new joint.shapes.basic.Rect({ 
        position: { x: 200, y: 150 }, size: { width: 70, height: 40 },
        attrs: { rect: { fill: '#4B4A67' }, text: { text: 'Feedback', fill: 'white' },magnet:true }
    });
    
    //Adding cells to graph
    
    graph.addCells([r1,r2,r3,r4,r5,d2,
    		new joint.dia.Link({
    			source : {id:r1.id},
    			target : {id:r3.id}	
    		}),
    		new joint.dia.Link({
    			source : {id:d2.id},
    			target : {id:r4.id}	
    		}),
    		new joint.dia.Link({
    			source : {id:d2.id},
    			target : {id:r5.id}	
    		}),
		    new joint.dia.Link({
				source : {id:r5.id},
				target : {id:r3.id}	
			}),
			new joint.dia.Link({
    			source : {id:r3.id},
    			target : {id:d2.id}	
    		}),
    		new joint.dia.Link({
    			source : {id:r4.id},
    			target : {id:r2.id}	
    		})
    
    	]);
    
   
    
    
})();