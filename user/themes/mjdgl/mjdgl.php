<?php
namespace Grav\Theme;

use Grav\Common\Theme;

class MichaelJDavies extends Theme
{
    // Add assets to the Admin
    public function onAssetsInitialized() {
        if ($this->isAdmin()) {

            // add JS
            $this->grav['assets']->addJs('theme://js/admin.js');
            // add CSS
            $this->grav['assets']->addCss('theme://css/admin.css');

        }
    }
}