<?php
namespace Grav\Theme;

use Grav\Common\Theme;

class Brandbasecamp extends Theme
{
    public static function getSubscribedEvents(): array
    {
        return [
            'onAssetsInitialized' => ['onAssetsInitialized', 0],
            // 'onPageInitialized'   => ['onPageInitialized', 0],
        ];
    }

    public function onAssetsInitialized()
    {
        // Only load on frontend
        if ($this->isAdmin()) {
            return;
        }

        $assets = $this->grav['assets'];

        // Add JS files in order
        $assets->addJs('https://code.jquery.com/jquery-3.4.1.min.js', ['group' => 'bottom', 'priority' => 80]);
        $assets->addJs('https://cdn.jsdelivr.net/npm/animejs@3.1.0/lib/anime.min.js', ['group' => 'bottom', 'priority' => 70]);
        $assets->addJs('//cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.7/ScrollMagic.min.js', ['group' => 'bottom', 'priority' => 60]);
        $assets->addJs('https://unpkg.com/@swup/ga-plugin@2', ['group' => 'bottom', 'priority' => 50]);
        $assets->addJs('https://unpkg.com/@swup/scroll-plugin@3', ['group' => 'bottom', 'priority' => 40]);
        $assets->addJs('https://cdnjs.cloudflare.com/ajax/libs/swup/4.5.0/Swup.umd.js', ['group' => 'bottom', 'priority' => 30]);
        $assets->addJs('https://unpkg.com/aos@2.3.1/dist/aos.js', ['group' => 'bottom', 'priority' => 20]);
        $assets->addJs('theme://js/global.js', ['group' => 'bottom', 'priority' => 10]);
    }

    // public function onPageInitialized()
    // {
    //     // Apply login restriction if page has require_login flag in frontmatter
    //     $page = $this->grav['page'];
    //     $header = $page->header();

    //     if (!empty($header->require_login)) {
    //         $header->access = ['site' => ['login' => true]];
    //         $page->header($header);
    //     }
    // }
}