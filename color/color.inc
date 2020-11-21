<?php

/**
 * @file
 * Lists available colors and color schemes for the Bartik theme.
 */

$info = [
  // Available colors and color labels used in theme.
  'fields' => [
    'brand-primary' => t('brand primary'),
    'navbar-inverse-color' => t('navbar inverse color'),
    'breadcrumb-color' => t('Breadcrumb Color'),
    'sidebar-background' => t('Sidebar Background Color'),
    'sidebar-link' => t('Sidebar Link Color'),
    'link-color'       => t('Link color'),
    'link-hover-color' => t('Link hover color'),
    'btn-primary-top'    => t('Button Background top color'),
    'btn-primary-bottom' => t('Button Background bottom color'),
    'btn-primary-color'  => t('Button Background value color')
  ],
  // Pre-defined color schemes.
  'schemes' => [
    'default' => [
      'title' => t('Blue Lagoon (default)'),
      'colors' => [
        'brand-primary'        => '#04578b',
        'navbar-inverse-color' => '#ffffff',
        'breadcrumb-color'     => '#cccccc',
        'sidebar-background'   => '#171c20',
        'sidebar-link'         => '#e7e9ea',
        'link-color'           => '#056dae',
        'link-hover-color'     => '#033e64',
        'btn-primary-top'    => '#007bc6',
        'btn-primary-bottom' => '#0071b8',
        'btn-primary-color'  => '#ffffff'
      ]
    ],
    'green' => [
      'title' => t('Green Forest (green)'),
      'colors' => [
        'brand-primary'        => '#005825',
        'navbar-inverse-color' => '#ffffff',
        'breadcrumb-color'     => '#cccccc',
        'sidebar-background'   => '#171c20',
        'sidebar-link'         => '#fafafa',
        'link-color'           => '#003d1b',
        'link-hover-color'     => '#005825',
        'btn-primary-top'    => '#10713a',
        'btn-primary-bottom' => '#003d1b',
        'btn-primary-color'  => '#ffffff'
      ]
    ]
  ],
  // CSS files (excluding @import) to rewrite with new color scheme.
  // If key is less file ,replace the css with complied less.
  'css' => [
    'less/bootstrap.less' => 'css/bootstrap.css',
  ],

  // Files to copy.
  'copy' => [
    'logo.svg',
  ],

  // Preview files.
  'preview_library' => 'dyniva_admin/color.preview',
  'preview_html' => 'color/preview.html',

  // Attachments.
  '#attached' => [
    'drupalSettings' => [
      'color' => [
        // Put the logo path into JavaScript for the live preview.
        'logo' => theme_get_setting('logo.url', 'dyniva_admin'),
      ],
    ],
  ],
];
