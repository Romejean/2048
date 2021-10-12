(function ($) // début du pluggin
{
    $.fn.game2048 = function () //function game2048 du pluggin
    {
        moveleft = true;

        // génération du tableau (table, tr, td) vide (rempli de zéros)
        function generate_map() {
            var table = $('<table></table>');
            for (var y = 0; y < 4; y++) {
                var ligne = $('<tr></tr>');
                for (var x = 0; x < 4; x++) {
                    var cases = $('<td>0</td>').attr('x', x).attr('y', y).attr('nbr', 0);
                    ligne.append(cases);
                }
                table.append(ligne);
            }
            return table;
        }


        var point = 0;
        // génération d'un certain nombre de cases (argument cases) aléatoirement placées sur les cases d'attribut 'nbr=0'
        function generate_case(cases) {
            point = point + 1;
            console.log(point);
            for (var i = 0; i < cases; i++) {
                var x = Math.floor((Math.random() * 4));
                var y = Math.floor((Math.random() * 4));
                var value = 2 * (Math.floor((Math.random() * 2) + 1));
                var elem = $('[x="' + x + '"][y="' + y + '"][nbr=0]');

                if (value === 4 && Math.random() > 0.5)
                    value = 2;
                if (!elem[0])
                    generate_case(1);
                else {
                    elem.attr('nbr', value);
                    elem.text(value);
                }
            }

        }

        // // Try gameover 2

        // function nospace(table) {
        //     for (var x = 0; x < 4; x++) {
        //         for (var y = 0; y < 4; y++) {
        //             if (table[x][y] == 0)
        //                 return false;

        //         }
        //     }
        //     return true;

        // }


        // function canMoveLeft(table) {
        //     for (var x = 0; x < 4; x++) {
        //         for (var y = 1; y < 4; y++) {
        //             if (table[x][y] != 0)
        //                 if (table[x][y - 1] == 0 || table[x][y - 1] == table[x][y])
        //                     return true;
        //         }
        //     }
        //     return false;
        // }
        // function canMoveUp(table) {
        //     for (var x = 1; x < 4; x++) {
        //         for (var y = 0; y < 4; y++) {
        //             if (table[x][y] != 0)
        //                 if (table[x - 1][y] == 0 || table[x - 1][y] == table[x][y])
        //                     return true;
        //         }
        //     }
        //     return false;
        // }

        // function canMoveRight(table) {
        //     for (var x = 0; x < 4; x++) {
        //         for (var y = 2; y > -1; y--) {
        //             if (table[x][y] != 0)
        //                 if (table[x][y + 1] == 0 || table[x][y + 1] == table[x][y])
        //                     return true;
        //         }
        //     }
        //     return false;
        // }

        // function canMoveDown(table) {
        //     for (var x = 2; x > -1; x--) {
        //         for (var y = 0; y < 4; y++) {
        //             if (table[x][y] != 0)
        //                 if (table[x + 1][y] == 0 || table[x + 1][y] == table[x][y])
        //                     return true;
        //         }
        //     }
        //     return false;
        // }

        // function nomove(table) {
        //     if (canMoveDown(table) || canMoveLeft(table) || canMoveRight(table) || canMoveUp(table)) {
        //         return false;
        //     }
        //     return true;

        // }

        // function isgameover() {
        //     if (nospace(board) && nomove(board)) {
        //         alert("Game Over")
        //     }
        // }

        // try gameover function
        // function gameover() {
        //     for (var y = 0; y < 4; y++) {
        //         for (var x = 0; x < 4; x++) {
        //             if (grid[x][y] == 0) {
        //                 return false;
        //             }

        //             if (x !== 3 && grid[x][y] === grid[x + 1][y]) {
        //                 return false;
        //             }

        //             if (y !== 3 && grid[x][y] === grid[x][y + 1]) {
        //                 return false;
        //             }
        //         }
        //     }
        //     return true;
        // }

        function moveTiles(elemA, elemB, valueB) {
            elemA.attr("nbr", valueB);
            elemA.text(valueB);
            elemB.attr("nbr", 0);
            elemB.text("0");

        }
        function mergeTiles(elemA, elemB, valuA) {
            var sum = valuA * 2;
            elemA.attr("nbr", sum);
            elemA.text(sum);
            if (sum === 2048) {
                return alert(" YOU WIN !!! ")
            }
            elemB.attr("nbr", 0);
            elemB.text("0");
        }

        function count(tiles) {
            let dp = [];
            dp[0] = 0;

            for (var i = 1; i <= tiles; i++) {
                if (i >= 1 && i <= 3)
                    dp[i] = 1;
                else if (i == 4)
                    dp[i] = 2;

                else {
                    dp[i] = dp[i - 1] + dp[i - 4];
                }
            }
            return dp[tiles];
        }



        function move_left() {
            var moved = false;
            for (var y = 0; y < 4; y++) {
                for (var x = 0; x < 4; x++) {
                    var elemA = $('[x=' + x + '][y=' + y + ']');
                    var valueA = parseInt($('[x=' + x + '][y=' + y + ']').attr("nbr"));
                    if (valueA === 0) {
                        for (a = x + 1; a < 4; a++) {
                            var elemB = $('[x=' + a + '][y=' + y + ']');
                            var valueB = parseInt($('[x=' + a + '][y=' + y + ']').attr("nbr"));
                            if (valueB === 0) {
                                continue;
                            }
                            else if (valueB !== 0) {
                                moved = true;
                                moveTiles(elemA, elemB, valueB);
                                x--;
                                break;
                            }

                        }
                    }
                    else if (valueA !== 0) {
                        for (a = x + 1; a < 4; a++) {
                            var elemB = $('[x=' + a + '][y=' + y + ']');
                            var valueB = parseInt($('[x=' + a + '][y=' + y + ']').attr("nbr"));
                            if (valueB === 0) {
                                continue;
                            }
                            else if (valueB !== valueA) {
                                break;
                            }
                            else if (valueB === valueA) {
                                moved = true;
                                mergeTiles(elemA, elemB, valueA);
                                break;
                            }
                        }
                    }
                }
            }
            if (moved === true) {
                generate_case(1);
            }

        }

        function move_right() {
            var moved = false;
            for (var y = 0; y < 4; y++) {
                for (var x = 3; x >= 0; x--) {
                    var elemA = $('[x=' + x + '][y=' + y + ']');
                    var valueA = parseInt($('[x=' + x + '][y=' + y + ']').attr("nbr"));
                    if (valueA === 0) {
                        for (a = x - 1; a >= 0; a--) {
                            var elemB = $('[x=' + a + '][y=' + y + ']');
                            var valueB = parseInt($('[x=' + a + '][y=' + y + ']').attr("nbr"));
                            if (valueB === 0) {
                                continue;
                            }
                            else if (valueB !== 0) {
                                moved = true;
                                moveTiles(elemA, elemB, valueB);
                                x++;
                                break;
                            }
                        }
                    }
                    else if (valueA !== 0) {
                        for (a = x - 1; a >= 0; a--) {
                            var elemB = $('[x=' + a + '][y=' + y + ']');
                            var valueB = parseInt($('[x=' + a + '][y=' + y + ']').attr("nbr"));
                            if (valueB === 0) {
                                continue;
                            }
                            else if (valueB !== valueA) {
                                break;
                            }
                            else if (valueB === valueA) {
                                moved = true;
                                mergeTiles(elemA, elemB, valueA);
                                break;
                            }
                        }
                    }
                }
            }
            if (moved === true) {
                generate_case(1);
            }
        }

        function move_bottom() {
            var moved = false;
            for (var x = 0; y < 4; x++) {
                for (var y = 3; y >= 0; y--) {
                    var elemA = $('[x=' + x + '][y=' + y + ']');
                    var valueA = parseInt($('[x=' + x + '][y=' + y + ']').attr("nbr"));
                    if (valueA === 0) {
                        for (a = y - 1; a >= 0; a--) {
                            var elemB = $('[x=' + x + '][y=' + a + ']');
                            var valueB = parseInt($('[x=' + x + '][y=' + a + ']').attr("nbr"));
                            if (valueB === 0) {
                                continue;
                            }
                            else if (valueB !== 0) {
                                moved = true;
                                moveTiles(elemA, elemB, valueB);
                                y++;
                                break;
                            }
                        }
                    }
                    else if (valueA !== 0) {
                        for (a = y - 1; a >= 0; a--) {
                            var elemB = $('[x=' + x + '][y=' + a + ']');
                            var valueB = parseInt($('[x=' + x + '][y=' + a + ']').attr("nbr"));
                            if (valueB === 0) {
                                continue;
                            }
                            else if (valueB !== valueA) {
                                break;
                            }
                            else if (valueB === valueA) {
                                moved = true;
                                mergeTiles(elemA, elemB, valueA);
                                break;
                            }
                        }
                    }
                }
            }
            if (moved === true) {
                generate_case(1);
            }
        }




        function move_Up() {
            var moved = false;
            for (var x = 0; x < 4; x++) {
                for (var y = 0; y < 4; y++) {
                    var elemA = $('[x=' + x + '][y=' + y + ']');
                    var valueA = parseInt($('[x=' + x + '][y=' + y + ']').attr("nbr"));
                    if (valueA === 0) {
                        for (a = y + 1; a < 4; a++) {
                            var elemB = $('[x=' + x + '][y=' + a + ']');
                            var valueB = parseInt($('[x=' + x + '][y=' + a + ']').attr("nbr"));
                            if (valueB === 0) {
                                continue;
                            }
                            else if (valueB !== 0) {
                                moved = true;
                                moveTiles(elemA, elemB, valueB);
                                y--;
                                break;
                            }
                        }
                    }
                    else if (valueA !== 0) {
                        for (a = y + 1; a < 4; a++) {
                            var elemB = $('[x=' + x + '][y=' + a + ']');
                            var valueB = parseInt($('[x=' + x + '][y=' + a + ']').attr("nbr"));
                            if (valueB === 0) {
                                continue;
                            }
                            else if (valueB !== valueA) {
                                break;
                            }
                            else if (valueB === valueA) {
                                moved = true;
                                mergeTiles(elemA, elemB, valueA);
                                break;
                            }
                        }
                    }
                }
            }
            if (moved === true) {
                generate_case(1);
            }
        }

        function checkforlose() {
            let zeros = 0
            if (cases === 64)
                return "YOU WIN !!!"

        }


        // fonction de gestion des évenements (appuie de touches)
        $('html').keydown(function (event) {
            switch (event['key']) {
                case 'ArrowLeft':
                    move_left()
                    console.log("Left");
                    break;
                case 'ArrowUp':
                    // insérer algo move up
                    move_Up();
                    console.log("Up");
                    break;
                case 'ArrowRight':
                    // insérer algo move right    
                    move_right();

                    console.log("Right");
                    break;
                case 'ArrowDown':
                    // insérer algo move down
                    move_bottom();
                    console.log("Down");
                    break;
            }
        });

        // début du code lancé
        $(this).append(generate_map()); // génération du tableau vide
        generate_case(2); // génération aléatoire de deux cases pleines (2 ou 4)
    }

})(jQuery); // fin du pluggin