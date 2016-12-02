<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<?php
echo "<title>Jezzy</title>";
echo "<link rel='shortcut icon' href='img/icons/favicon.ico'>";
echo '<script src="lib/jquery/jquery-2.1.4.min.js"></script>';
echo '<script src="lib/jasny-bootstrap/js/jasny-bootstrap.min.js"></script>';
echo '<script src="lib/bootstrap/js/bootstrap.min.js"></script>';
echo '<script src="lib/bootstrap/js/bootstrap.min.js"></script>';
echo '<link rel="stylesheet" href="lib/bootstrap/css/bootstrap.min.css">';
echo '<link rel="stylesheet" href="lib/jasny-bootstrap/css/jasny-bootstrap.min.css">';
echo '<link rel="stylesheet" href="css/page/padrao.css">';
//echo '<script src="js/page/base.js"></script>';
echo '<script src="js/page/configuracao.js"></script>';
echo '<script src="lib/jquery/jquery.base64.js"></script>';
echo '<script src="lib/jquery-storage/jquery.cookie.js"></script>';
echo '<script src="lib/jquery-storage/jquery.storageapi.min.js"></script>';
echo '<link rel="stylesheet" href="lib/font-awesome-4.6.3/css/font-awesome.css">';
echo '<script src="lib/jquery-confirm/js/jquery-confirm.min.js"></script>';
echo '<link rel="stylesheet" href="lib/jquery-confirm/css/jquery-confirm.min.css">';
echo '<script src="lib/jquery-storage/json2.js"></script>';
echo '<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.maskedinput/1.4.1/jquery.maskedinput.min.js" type="text/javascript"></script>';
$active['agenda'] = '';
$active['servicos'] = '';
$active['home'] = '';
$active['ofertas'] = '';
$active['compras'] = '';
$active['voucher'] = '';
$active[$page] = 'active';	
echo '<body class="fadeIn">';
echo "<nav id='myNavmenu' class='navmenu navmenu-default navmenu-fixed-left offcanvas' role='navigation'>
    <a class='navmenu-brand' id='userName' href='https://".$ip."/jezzy-mobile-professionals/public_html/my_profile.html'>".$user."<br><small>".$salao."</small></a>
    <ul class='nav navmenu-nav'>
        <li class='".$active["home"]."'><a href='https://".$ip."/jezzy-mobile-professionals/public_html/home.html'><img src='img/icons/homeFooterIcon.PNG' class='icon-bar'>HOME</a></li>
        <li class='".$active["servicos"]."'><a href='https://".$ip."/jezzy-mobile-professionals/public_html/services_history.html'><img src='img/icons/Servicos.png' class='icon-bar'>SERVIÇOS REALIZADOS</a></li>
        <li><a><img src='img/icons/Sair%20-%20branco-07.png' class='icon-bar'>SAIR</a></li>
    </ul>
</nav>";
?>

<div class="navbar-default navbar-fixed-top centerLogoJezzy">
            <span class="">
                <img src="img/icons/logo_login.PNG" class="sizeLogo" />
            </span>
    <button type="button" class="navbar-toggle" data-toggle="offcanvas" data-target="#myNavmenu" data-canvas="body">
        <img src="img/icons/Menu.png" class="menu" id="menu"/>
    </button>
           
    <div class="bottomLine"></div>
</div>

