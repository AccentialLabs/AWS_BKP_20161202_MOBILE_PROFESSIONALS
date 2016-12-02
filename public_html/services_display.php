<html>
    <meta charset="UTF-8">
    <head>
        <?php
		$salao = json_decode($_COOKIE['companies'], true);
		$salao = $salao['fancy_name'];
        $cookie = json_decode($_COOKIE['SecondaryUser'], true);
        $user = $cookie['name'];
        $page = 'home';
		include 'php/configuracao.php';
        include 'php/Menu/Menu.php';
        ?>
        <script src="js/page/configuracao.js"></script>
        <script src="lib/hammer.js-master/hammer.js"></script>
        <script src="lib/jquery-storage/json2.js"></script>
    </head>
    <body id="container">
        <?php
        $title = utf8_encode('MEUS SERVIÇOS');
        include 'php/Menu/Title.php';
        include 'php/Utils/Utils.php';
			
		
        $obj = new Utils();
        $query = 'SELECT * FROM service_secondary_users INNER JOIN services ON services.id = service_secondary_users.service_id INNER JOIN subclasses ON subclasses.id = services.subclasse_id INNER JOIN classes on classes.id = subclasses.classe_id WHERE secondary_user_id = ' . $cookie['id'];

        $result = $obj->ApiRequest($query);
		$class = "";
		foreach($result as $item){
			$classcompare = $item->classes->name;
			if($classcompare!= $class){
				$class = $classcompare;
				echo "<div data-toggle='collapse' data-target='.".$item->classes->name."' class='tablecontenttitle'>".$item->classes->name."</div>";
				echo "<div class='tablecontent ".$item->classes->name."  collapse'><span style='font-weight:bolder; text-align: center;'>".$item->subclasses->name."</span>(".$item->services->time."min)<span class='pull-right'>R$".$item->services->value."</span></div>";
			}else{
				echo "<div class='tablecontent ".$item->classes->name."  collapse'><span style='font-weight:bolder; text-align: center;'>".$item->subclasses->name." </span>(".$item->services->time."min)<span class='pull-right'>R$".$item->services->value."</span></div>";
			}
			
			
		}
		
        ?>	
        <script>
            function setTwoNumberDecimal(event) {
                this.value = parseFloat(this.value).toFixed(2);
            }
       

            function createToken() {
                var arraySend = {
                    'secureNumbers': Math.floor(new Date().getTime() / 1000)
                };
                var json = JSON.stringify(arraySend);
                return Base64.encode(json);
            }
            var Base64 = {
                _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
                encode: function (input) {
                    var output = "";
                    var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
                    var i = 0;
                    input = Base64._utf8_encode(input);
                    while (i < input.length) {
                        chr1 = input.charCodeAt(i++);
                        chr2 = input.charCodeAt(i++);
                        chr3 = input.charCodeAt(i++);
                        enc1 = chr1 >> 2;
                        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                        enc4 = chr3 & 63;
                        if (isNaN(chr2)) {
                            enc3 = enc4 = 64;
                        } else if (isNaN(chr3)) {
                            enc4 = 64;
                        }
                        output = output + this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) + this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
                    }
                    return output;
                },
                decode: function (input) {
                    var output = "";
                    var chr1, chr2, chr3;
                    var enc1, enc2, enc3, enc4;
                    var i = 0;
                    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
                    while (i < input.length) {
                        enc1 = this._keyStr.indexOf(input.charAt(i++));
                        enc2 = this._keyStr.indexOf(input.charAt(i++));
                        enc3 = this._keyStr.indexOf(input.charAt(i++));
                        enc4 = this._keyStr.indexOf(input.charAt(i++));
                        chr1 = (enc1 << 2) | (enc2 >> 4);
                        chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                        chr3 = ((enc3 & 3) << 6) | enc4;
                        output = output + String.fromCharCode(chr1);
                        if (enc3 != 64) {
                            output = output + String.fromCharCode(chr2);
                        }
                        if (enc4 != 64) {
                            output = output + String.fromCharCode(chr3);
                        }
                    }
                    output = Base64._utf8_decode(output);
                    return output;
                },
                _utf8_encode: function (string) {
                    string = string.replace(/\r\n/g, "\n");
                    var utftext = "";
                    for (var n = 0; n < string.length; n++) {
                        var c = string.charCodeAt(n);
                        if (c < 128) {
                            utftext += String.fromCharCode(c);
                        } else if ((c > 127) && (c < 2048)) {
                            utftext += String.fromCharCode((c >> 6) | 192);
                            utftext += String.fromCharCode((c & 63) | 128);
                        } else {
                            utftext += String.fromCharCode((c >> 12) | 224);
                            utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                            utftext += String.fromCharCode((c & 63) | 128);
                        }
                    }
                    return utftext;
                },
                _utf8_decode: function (utftext) {
                    var string = "";
                    var i = 0;
                    var c = c1 = c2 = 0;
                    while (i < utftext.length) {
                        c = utftext.charCodeAt(i);
                        if (c < 128) {
                            string += String.fromCharCode(c);
                            i++;
                        } else if ((c > 191) && (c < 224)) {
                            c2 = utftext.charCodeAt(i + 1);
                            string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                            i += 2;
                        } else {
                            c2 = utftext.charCodeAt(i + 1);
                            c3 = utftext.charCodeAt(i + 2);
                            string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                            i += 3;
                        }
                    }
                    return string;
                }
            };

        </script>
    </body>
</html>