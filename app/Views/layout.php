<html>
  <head>
    <style type="text/css">
    .active {
      color: red;
    }
    a {
      padding-right: 5px;
    }
    </style>
  </head>
  <body>
    <div id="root"></div>

    <?php $isDevelopment = ENVIRONMENT === 'development'; ?>

    <script src="<?php echo 'https://unpkg.com/react@16.13.1/umd/react.'. (! $isDevelopment ? 'production.min' : 'development') . '.js'; ?>"></script>
    <script src="<?php echo 'https://unpkg.com/react-dom@16.13.1/umd/react-dom.'. (! $isDevelopment ? 'production.min' : 'development') . '.js'; ?>"></script>
    <script src="<?php echo 'https://unpkg.com/dompurify@2.0.12/dist/purify.'. (! $isDevelopment ? 'min.' : '') . 'js'; ?>"></script>
    <script src="<?php echo 'https://unpkg.com/html-react-parser@0.13.0/dist/html-react-parser.'. (! $isDevelopment ? 'min.' : '') . 'js'; ?>"></script>
    <script src="<?php echo 'https://unpkg.com/react-router-dom@5.2.0/umd/react-router-dom.'. (! $isDevelopment ? 'min.' : '') . 'js'; ?>"></script>

    <script src="<?php echo site_url($isDevelopment
            ? '/js/app.js'
            : (
                // when after run webpack, allow to use bundled js
                // fallback to use /js/app.js when not
                file_exists(ROOTPATH . 'public/js/dist/bundle.js')
                    ? '/js/dist/bundle.js'
                    : '/js/app.js'
            )) ?>" type="module"></script>
  </body>
</html>