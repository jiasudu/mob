var PopupBottom = function(panel,options){
	panel.css('position','fixed');
	panel.css('bottom','-'+panel.height()+'px');
	(typeof options == 'object') || (options = {});
	options.opacity  || (options.opacity  = '0.8');
	options.duration || (options.duration = '0.5');
	panel.css('opacity',options.opacity);
	setTimeout(function(){
		panel.css('-webkit-transition-duration',options.duration+'s');
	},10);
	panel.popedUp = false;
	panel.popup   = function(){
		this.popedUp = true;
		this.css('-webkit-transform','translate3d(0px,-'+this.height()+'px,0px)');
		return this;
	}.bind(panel);
	panel.popdown = function(){
		this.popedUp = false;
		this.css('-webkit-transform','translate3d(0px,0px,0px)');
		return this;
	}.bind(panel);
	panel.shift = function(){
		if(this.popedUp) return this.popdown();
		return this.popup();
	}.bind(panel);
        /*
        function prevent(e){ e.preventDefault(); };
        panel.on('click',prevent);
        panel.on('touchstart',prevent);
        panel.on('touchend',prevent);
        panel.on('touchmove',prevent);
        */
	return panel;
}
