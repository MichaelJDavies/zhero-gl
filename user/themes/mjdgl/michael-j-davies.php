<?php
// namespace Grav\Theme;

// use Grav\Common\Theme;

// class MichaelJDavies extends Theme
// {
//     // Add assets to the Admin
//     public function onAssetsInitialized() {
//         if ($this->isAdmin()) {

//             // add JS
//             $this->grav['assets']->addJs('theme://js/admin.js');
//             // add CSS
//             $this->grav['assets']->addCss('theme://css/admin.css');

//         }
//     }
// }



// namespace Grav\Theme;

// use Grav\Common\Theme;

// class MichaelJDavies extends Theme
// {
//     public function onTwigSiteVariables()
//     {
//         $page = $this->grav['page'];

//         // Check if page is locked
//         $requireLogin = $page->header()->require_login ?? false;

//         // Check if user is logged in
//         $user = $this->grav['user'];
//         $loggedIn = $user ? true : false;

//         // Pass to Twig
//         $this->grav['twig']->twig_vars['require_login'] = $requireLogin;
//         $this->grav['twig']->twig_vars['logged_in'] = $loggedIn;
//     }

//     public function onAssetsInitialized() {
//         if ($this->isAdmin()) {

//             // add JS
//             $this->grav['assets']->addJs('theme://js/admin.js');
//             // add CSS
//             $this->grav['assets']->addCss('theme://css/admin.css');

//         }
//     }
// }



namespace Grav\Theme;

use Grav\Common\Theme;

class MichaelJDavies extends Theme
{
    public function onTwigSiteVariables()
    {
        $page = $this->grav['page'];

        // Check if page is locked
        $requireLogin = $page->header()->require_login ?? false;

        // Check if user is logged in
        $user = $this->grav['user'];
        $loggedIn = $user ? true : false;

        // Pass to Twig
        $this->grav['twig']->twig_vars['require_login'] = $requireLogin;
        $this->grav['twig']->twig_vars['logged_in'] = $loggedIn;

        // ✅ Add frontend JS here so it only runs on the site (not admin)
        if (!$this->isAdmin()) {
            $assets = $this->grav['assets'];

            // External libraries in order
            $assets->addJs('https://code.jquery.com/jquery-3.4.1.min.js', ['group' => 'bottom', 'priority' => 10]);
            $assets->addJs('https://cdn.jsdelivr.net/npm/animejs@3.1.0/lib/anime.min.js', ['group' => 'bottom', 'priority' => 20]);
            $assets->addJs('https://cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.7/ScrollMagic.min.js', ['group' => 'bottom', 'priority' => 30]);
            $assets->addJs('https://unpkg.com/@swup/ga-plugin@2', ['group' => 'bottom', 'priority' => 40]);
            $assets->addJs('https://unpkg.com/@swup/scroll-plugin@3', ['group' => 'bottom', 'priority' => 50]);
            $assets->addJs('https://cdnjs.cloudflare.com/ajax/libs/swup/4.5.0/Swup.umd.js', ['group' => 'bottom', 'priority' => 60]);
            $assets->addJs('https://unpkg.com/aos@2.3.1/dist/aos.js', ['group' => 'bottom', 'priority' => 70]);

            // Theme JS last
            $assets->addJs('theme://js/global.js', ['group' => 'bottom', 'priority' => 80]);
        }
    }

    public function onAssetsInitialized()
    {
        // ✅ Keep admin-only assets here
        if ($this->isAdmin()) {
            $this->grav['assets']->addJs('theme://js/admin.js');
            $this->grav['assets']->addCss('theme://css/admin.css');
        }
    }
}

