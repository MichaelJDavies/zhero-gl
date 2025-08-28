(($) => {
  $.fn.BlockConfigurator = function(color) {

    let _addPosition = 'top';

    const _openSelection = function($list, event){
      let button = $(event.currentTarget);
      _addPosition = button.data('block-add-position');
      $list.find('[data-block-element="dialog-new"]')[0].showModal()
    }

    function uuidv4() {
      return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
        (+c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +c / 4).toString(16)
      );
    }

    const _addItem = function($list, event){
          
      let button = $(event.currentTarget);
      let template = button.data('block-template-html');

      template = template.replaceAll(/--BLOCK-UID--/ig, uuidv4())
  
      const listItemsHolder = $list.find('[data-block-element="list"]');

      console.log(_addPosition);
  
      if(_addPosition == 'top'){
          listItemsHolder.prepend(template);
      }
      else if(_addPosition == 'bottom'){
          listItemsHolder.append(template);
      }
      else {
        const block = $list.find(`[data-block-id="${_addPosition}"]`);
        if(block.length == 1){
          $(template).insertAfter(block);
        }
      }
  
      $list.find('[data-block-element="dialog-new"]')[0].close()
  
      _afterChangeList($list);
    }

    // const _move = function($list, event){
    //   let button = $(event.currentTarget);
    //   let $item = $(button.closest('li'));

    //   const direction = button.attr('data-block-direction');

    //   if(direction == 'up'){
    //     const prev = $item.prev();
    //     $item.insertBefore(prev);
    //   } else {
    //     const next = $item.next();
    //     $item.insertAfter(next);
    //   }

    //   _afterChangeList($list);
    // }


function enableDragAndDrop($list, handleSelector) {
  // Initially disable dragging on <li>
  $list.find('li').attr('draggable', false);

  // Enable drag only when handle is pressed
  $list.on('mousedown', handleSelector, function (e) {
    const $item = $(this).closest('li');
    $item.attr('draggable', true);

    // When drag starts
    $item.on('dragstart', function (e2) {
      $(this).addClass('dragging');
      e2.originalEvent.dataTransfer.setData('text/plain', '');
    });

    // Reset draggable when drag ends
    $item.on('dragend', function () {
      $(this).removeClass('dragging');
      $(this).attr('draggable', false); // disable again
    });
  });

  // Handle drag over items
  $list.on('dragover', 'li', function (e) {
    e.preventDefault(); // allow drop
    const $dragging = $list.find('.dragging');
    const $target = $(this);
    if ($dragging[0] === $target[0]) return;

    const offset = e.originalEvent.clientY - $target.offset().top;
    if (offset > $target.outerHeight() / 2) {
      $target.after($dragging);
    } else {
      $target.before($dragging);
    }
  });

  // Handle drop (cleanup + callback)
  $list.on('drop', function () {
    const $dragging = $list.find('.dragging');
    $dragging.removeClass('dragging').attr('draggable', false);
    _afterChangeList($list);
  });
}

enableDragAndDrop($('#my-list'), '.drag-handle');


    const _move = function($list, event){
      let button = $(event.currentTarget);
      let $item = $(button.closest('li'));

      // --- FLIP Step 1: record current position ---
      const firstRect = $item[0].getBoundingClientRect();

      const direction = button.attr('data-block-direction');

      // --- Reorder the item in the DOM ---
      if(direction === 'up'){
        const prev = $item.prev();
        if(prev.length) $item.insertBefore(prev);
      } else {
        const next = $item.next();
        if(next.length) $item.insertAfter(next);
      }

      // --- FLIP Step 2: record new position ---
      const lastRect = $item[0].getBoundingClientRect();

      // --- FLIP Step 3: invert (move it back visually) ---
      const invertY = firstRect.top - lastRect.top;
      $item.css({
        transform: `translateY(${invertY}px)`
      });

      // --- FLIP Step 4: play (animate to new spot) ---
      requestAnimationFrame(() => {
        $item.css({
          transition: 'transform 300ms ease',
          transform: 'translateY(0)'
        });
      });

      // --- Cleanup after animation ---
      $item.one('transitionend', () => {
        $item.css({ transition: '', transform: '' });
      });

      _afterChangeList($list);
    }

    const _toogleItem = function(event) {
      let button = $(event.currentTarget);
      let $item = $(button.closest('li'));

      const collapseClass = 'blocks__block--collapsed';
      $item[$item.hasClass(collapseClass) ? 'removeClass' : 'addClass'](collapseClass)
    }

    let _removeElement = null;

    const _openRemoveDialog = function($list, event){
      let button = $(event.currentTarget);
      let $item = $(button.closest('li'));
      _removeElement = $item;
      $list.find('[data-block-element="dialog-remove"]')[0].showModal()
    }

    const _remove = function($list){
      _removeElement.remove();
      $list.find('[data-block-element="dialog-remove"]')[0].close()
      _afterChangeList($list);
    }

    const _afterChangeList = function($list){

      const listItemsHolder = $list.find('[data-block-element="list"]');
  
      if(listItemsHolder.children().length == 0){
        $list.find(`[data-block-action="open-selection"][data-block-add-index="append"]`).addClass('hidden');
      } else {
        $list.find(`[data-block-action="open-selection"][data-block-add-index="append"]`).removeClass('hidden');
      }
    }

    const _closeDialogOnBacktrop = function(event){
      if (event.target.tagName.toLowerCase() === 'dialog') {
        setTimeout(() => {
          event.target.close();
        }, 100);
      }
    }

    const _closeDialog = function(event){
      $(event.target).closest('dialog')[0].close();
    }

    return this.each(function() {
        const $list = $(this);
        
        if($list.attr('data-blocks-initialized')){
          return;
        }
        $list.attr('data-blocks-initialized', true);
        
        $list.on('click', '[data-block-action="open-selection"]', (event) => _openSelection($list, event));
        $list.on('click', `[data-block-action="add"]`, (event) => _addItem($list, event));
        $list.on('click', `[data-block-action="toggle"]`, (event) => _toogleItem(event));
        $list.on('click', `[data-block-action="open-remove-dialog"]`, (event) => _openRemoveDialog($list, event));
        $list.on('click', `[data-block-action="remove"]`, (event) => _remove($list, event));
        $list.on('click', `[data-block-action="move"]`, (event) => _move($list, event));
        $list.on('click', `dialog`, (event) => _closeDialogOnBacktrop(event));
        $list.on('click', `[data-block-action="close-dialog"]`, (event) => _closeDialog(event));
        
    });
  };

  const  _onAddedNodes = function(_, target) {
    $(target).find('[data-blocks]').each((_, list) => $(list).BlockConfigurator());
  }

  const _init = function(){
    const body = $("body");
    $('[data-blocks]').each((_, list) => $(list).BlockConfigurator());
    body.on("mutation._grav", _onAddedNodes);
  }

  _init();
})($);