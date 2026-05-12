import { useState, useEffect, useCallback, useRef } from "react";

// ── SPIKE 5.9: THROWAWAY — remove after measurement ─────────────────────────
const SPIKE_59_ENABLED = true;

const USDA_SPIKE_DB = [
{"id":"quinoa_raw","name":"Quinoa, raw","cat":"Grains","cal":368,"pro":14.1,"carb":64.2,"fat":6.1,"fib":7.0,"iron":4.6,"calc":47,"zinc":3.1,"omega3":0.29,"mag":197,"pot":563,"fol":184},
{"id":"quinoa_cooked","name":"Quinoa, cooked","cat":"Grains","cal":120,"pro":4.4,"carb":21.3,"fat":1.9,"fib":2.8,"iron":1.5,"calc":17,"zinc":1.1,"omega3":0.09,"mag":64,"pot":172,"fol":42},
{"id":"barley_raw","name":"Barley, hulled, raw","cat":"Grains","cal":354,"pro":12.5,"carb":73.5,"fat":2.3,"fib":17.3,"iron":3.6,"calc":33,"zinc":2.8,"omega3":0.11,"mag":133,"pot":452,"fol":19},
{"id":"barley_cooked","name":"Barley, cooked","cat":"Grains","cal":123,"pro":2.3,"carb":28.2,"fat":0.4,"fib":3.8,"iron":1.3,"calc":11,"zinc":0.8,"omega3":0.03,"mag":22,"pot":93,"fol":16},
{"id":"buckwheat_raw","name":"Buckwheat, raw","cat":"Grains","cal":343,"pro":13.3,"carb":71.5,"fat":3.4,"fib":10.0,"iron":2.2,"calc":18,"zinc":2.4,"omega3":0.08,"mag":231,"pot":460,"fol":30},
{"id":"buckwheat_cooked","name":"Buckwheat, cooked","cat":"Grains","cal":92,"pro":3.4,"carb":19.9,"fat":0.6,"fib":2.7,"iron":0.8,"calc":7,"zinc":0.6,"omega3":0.02,"mag":51,"pot":88,"fol":14},
{"id":"millet_raw","name":"Millet, raw","cat":"Grains","cal":378,"pro":11.0,"carb":72.9,"fat":4.2,"fib":8.5,"iron":3.0,"calc":8,"zinc":1.7,"omega3":0.05,"mag":114,"pot":195,"fol":85},
{"id":"millet_cooked","name":"Millet, cooked","cat":"Grains","cal":119,"pro":3.5,"carb":23.7,"fat":1.0,"fib":1.3,"iron":0.6,"calc":3,"zinc":0.9,"omega3":0.01,"mag":44,"pot":62,"fol":19},
{"id":"brown_rice_raw","name":"Brown rice, raw","cat":"Grains","cal":370,"pro":7.9,"carb":77.2,"fat":2.9,"fib":3.5,"iron":1.5,"calc":23,"zinc":2.0,"omega3":0.02,"mag":143,"pot":223,"fol":20},
{"id":"brown_rice_cooked","name":"Brown rice, cooked","cat":"Grains","cal":123,"pro":2.7,"carb":25.6,"fat":1.0,"fib":1.8,"iron":0.4,"calc":10,"zinc":0.8,"omega3":0.01,"mag":44,"pot":86,"fol":9},
{"id":"amaranth_raw","name":"Amaranth, raw","cat":"Grains","cal":371,"pro":13.6,"carb":65.3,"fat":7.0,"fib":6.7,"iron":7.6,"calc":159,"zinc":2.9,"omega3":0.04,"mag":248,"pot":508,"fol":82},
{"id":"amaranth_cooked","name":"Amaranth, cooked","cat":"Grains","cal":102,"pro":3.8,"carb":18.7,"fat":1.6,"fib":2.1,"iron":2.1,"calc":47,"zinc":0.9,"omega3":0.01,"mag":65,"pot":135,"fol":29},
{"id":"lentils_raw","name":"Lentils, raw","cat":"Legumes","cal":353,"pro":25.8,"carb":60.1,"fat":1.1,"fib":10.7,"iron":6.5,"calc":35,"zinc":3.3,"omega3":0.07,"mag":122,"pot":955,"fol":479},
{"id":"lentils_cooked","name":"Lentils, cooked","cat":"Legumes","cal":116,"pro":9.0,"carb":20.1,"fat":0.4,"fib":7.9,"iron":3.3,"calc":19,"zinc":1.3,"omega3":0.02,"mag":36,"pot":369,"fol":181},
{"id":"black_beans_dry","name":"Black beans, dry","cat":"Legumes","cal":341,"pro":21.6,"carb":62.4,"fat":1.4,"fib":15.5,"iron":5.0,"calc":123,"zinc":3.4,"omega3":0.11,"mag":171,"pot":1483,"fol":444},
{"id":"black_beans_cooked","name":"Black beans, cooked","cat":"Legumes","cal":132,"pro":8.9,"carb":23.7,"fat":0.5,"fib":8.7,"iron":2.1,"calc":27,"zinc":1.1,"omega3":0.04,"mag":70,"pot":355,"fol":149},
{"id":"chickpeas_dry","name":"Chickpeas, dry","cat":"Legumes","cal":378,"pro":20.5,"carb":62.9,"fat":6.0,"fib":12.2,"iron":6.2,"calc":57,"zinc":3.4,"omega3":0.11,"mag":79,"pot":718,"fol":557},
{"id":"chickpeas_cooked","name":"Chickpeas, cooked","cat":"Legumes","cal":164,"pro":8.9,"carb":27.4,"fat":2.6,"fib":7.6,"iron":2.9,"calc":49,"zinc":1.5,"omega3":0.06,"mag":48,"pot":291,"fol":172},
{"id":"kidney_beans_dry","name":"Kidney beans, dry","cat":"Legumes","cal":333,"pro":23.6,"carb":60.0,"fat":0.8,"fib":15.2,"iron":8.2,"calc":83,"zinc":2.8,"omega3":0.1,"mag":138,"pot":1406,"fol":394},
{"id":"kidney_beans_cooked","name":"Kidney beans, cooked","cat":"Legumes","cal":127,"pro":8.7,"carb":22.8,"fat":0.5,"fib":6.4,"iron":2.9,"calc":28,"zinc":1.1,"omega3":0.03,"mag":45,"pot":405,"fol":130},
{"id":"green_peas_frozen","name":"Peas, green, frozen","cat":"Legumes","cal":77,"pro":5.2,"carb":13.5,"fat":0.4,"fib":4.5,"iron":1.5,"calc":25,"zinc":1.2,"omega3":0.03,"mag":33,"pot":271,"fol":65},
{"id":"split_peas_dry","name":"Split peas, dry","cat":"Legumes","cal":352,"pro":24.6,"carb":63.4,"fat":1.2,"fib":25.5,"iron":4.4,"calc":55,"zinc":3.0,"omega3":0.09,"mag":115,"pot":981,"fol":274},
{"id":"banana_raw","name":"Banana, raw","cat":"Fruit","cal":89,"pro":1.1,"carb":22.8,"fat":0.3,"fib":2.6,"iron":0.3,"calc":5,"zinc":0.2,"omega3":0.03,"mag":27,"pot":358,"fol":20},
{"id":"avocado_raw","name":"Avocado, raw","cat":"Fruit","cal":160,"pro":2.0,"carb":8.5,"fat":14.7,"fib":6.7,"iron":0.6,"calc":12,"zinc":0.6,"omega3":0.11,"mag":29,"pot":485,"fol":81},
{"id":"mango_raw","name":"Mango, raw","cat":"Fruit","cal":60,"pro":0.8,"carb":15.0,"fat":0.4,"fib":1.6,"iron":0.2,"calc":11,"zinc":0.1,"omega3":0.05,"mag":10,"pot":168,"fol":43},
{"id":"papaya_raw","name":"Papaya, raw","cat":"Fruit","cal":43,"pro":0.5,"carb":10.8,"fat":0.3,"fib":1.7,"iron":0.3,"calc":20,"zinc":0.1,"omega3":0.05,"mag":21,"pot":182,"fol":37},
{"id":"guava_raw","name":"Guava, raw","cat":"Fruit","cal":68,"pro":2.6,"carb":14.3,"fat":1.0,"fib":5.4,"iron":0.3,"calc":18,"zinc":0.2,"omega3":0.04,"mag":22,"pot":417,"fol":49},
{"id":"dates_dry","name":"Dates, dried","cat":"Fruit","cal":282,"pro":2.5,"carb":75.0,"fat":0.4,"fib":8.0,"iron":1.0,"calc":39,"zinc":0.3,"omega3":0.01,"mag":43,"pot":656,"fol":15},
{"id":"chia_seeds","name":"Chia seeds","cat":"Nuts/Seeds","cal":486,"pro":16.5,"carb":42.1,"fat":30.7,"fib":34.4,"iron":7.7,"calc":631,"zinc":4.6,"omega3":17.8,"mag":335,"pot":407,"fol":49},
{"id":"flaxseeds","name":"Flaxseeds","cat":"Nuts/Seeds","cal":534,"pro":18.3,"carb":28.9,"fat":42.2,"fib":27.3,"iron":5.7,"calc":255,"zinc":4.3,"omega3":22.8,"mag":392,"pot":813,"fol":87},
{"id":"hemp_seeds","name":"Hemp seeds","cat":"Nuts/Seeds","cal":553,"pro":31.6,"carb":8.7,"fat":48.8,"fib":4.0,"iron":8.0,"calc":70,"zinc":9.9,"omega3":8.7,"mag":700,"pot":1200,"fol":110},
{"id":"pumpkin_seeds","name":"Pumpkin seeds","cat":"Nuts/Seeds","cal":559,"pro":30.2,"carb":10.7,"fat":49.0,"fib":6.0,"iron":8.8,"calc":46,"zinc":7.8,"omega3":0.12,"mag":592,"pot":809,"fol":58},
{"id":"sunflower_seeds","name":"Sunflower seeds","cat":"Nuts/Seeds","cal":584,"pro":20.8,"carb":20.0,"fat":51.5,"fib":8.6,"iron":5.3,"calc":78,"zinc":5.0,"omega3":0.07,"mag":325,"pot":645,"fol":227},
{"id":"almonds_raw","name":"Almonds, raw","cat":"Nuts/Seeds","cal":579,"pro":21.2,"carb":21.6,"fat":49.9,"fib":12.5,"iron":3.7,"calc":269,"zinc":3.1,"omega3":0.0,"mag":270,"pot":733,"fol":44},
{"id":"walnuts_raw","name":"Walnuts, raw","cat":"Nuts/Seeds","cal":654,"pro":15.2,"carb":13.7,"fat":65.2,"fib":6.7,"iron":2.9,"calc":98,"zinc":3.1,"omega3":9.1,"mag":158,"pot":441,"fol":98},
{"id":"cashews_raw","name":"Cashews, raw","cat":"Nuts/Seeds","cal":553,"pro":18.2,"carb":30.2,"fat":43.8,"fib":3.3,"iron":6.7,"calc":37,"zinc":5.8,"omega3":0.14,"mag":292,"pot":660,"fol":25},
{"id":"peanut_butter","name":"Peanut butter, natural","cat":"Nuts/Seeds","cal":588,"pro":25.1,"carb":20.0,"fat":50.4,"fib":6.0,"iron":1.9,"calc":43,"zinc":2.9,"omega3":0.02,"mag":154,"pot":649,"fol":92},
{"id":"cassava_raw","name":"Cassava, raw","cat":"Latin Staples","cal":160,"pro":1.4,"carb":38.1,"fat":0.3,"fib":1.8,"iron":0.3,"calc":16,"zinc":0.3,"omega3":0.04,"mag":21,"pot":271,"fol":27},
{"id":"cassava_boiled","name":"Cassava, boiled","cat":"Latin Staples","cal":112,"pro":1.0,"carb":27.8,"fat":0.4,"fib":1.6,"iron":0.3,"calc":13,"zinc":0.2,"omega3":0.03,"mag":17,"pot":223,"fol":14},
{"id":"plantain_raw","name":"Plantain, raw","cat":"Latin Staples","cal":122,"pro":1.3,"carb":31.9,"fat":0.4,"fib":2.3,"iron":0.6,"calc":3,"zinc":0.1,"omega3":0.03,"mag":37,"pot":499,"fol":22},
{"id":"plantain_boiled","name":"Plantain, boiled","cat":"Latin Staples","cal":116,"pro":1.3,"carb":31.2,"fat":0.1,"fib":2.5,"iron":0.6,"calc":2,"zinc":0.1,"omega3":0.02,"mag":32,"pot":465,"fol":19},
{"id":"yucca_flour","name":"Cassava flour","cat":"Latin Staples","cal":330,"pro":1.6,"carb":79.0,"fat":0.6,"fib":3.7,"iron":1.6,"calc":31,"zinc":0.3,"omega3":0.03,"mag":40,"pot":271,"fol":32},
{"id":"arepa_cornmeal","name":"Precooked cornmeal","cat":"Latin Staples","cal":360,"pro":7.0,"carb":79.0,"fat":1.5,"fib":4.5,"iron":2.3,"calc":7,"zinc":1.2,"omega3":0.05,"mag":35,"pot":142,"fol":40},
{"id":"shiitake_raw","name":"Shiitake mushrooms, raw","cat":"Mushrooms","cal":34,"pro":2.2,"carb":6.8,"fat":0.5,"fib":2.5,"iron":0.4,"calc":2,"zinc":1.0,"omega3":0.01,"mag":20,"pot":304,"fol":13},
{"id":"portobello_raw","name":"Portobello mushrooms, raw","cat":"Mushrooms","cal":22,"pro":2.1,"carb":3.9,"fat":0.3,"fib":1.3,"iron":0.5,"calc":3,"zinc":0.5,"omega3":0.01,"mag":14,"pot":364,"fol":28},
{"id":"oyster_mushrooms_raw","name":"Oyster mushrooms, raw","cat":"Mushrooms","cal":33,"pro":3.3,"carb":6.1,"fat":0.4,"fib":2.3,"iron":1.3,"calc":3,"zinc":0.8,"omega3":0.02,"mag":18,"pot":420,"fol":38},
{"id":"tofu_firm","name":"Tofu, firm","cat":"Soy","cal":144,"pro":17.3,"carb":3.0,"fat":8.7,"fib":2.3,"iron":2.7,"calc":683,"zinc":1.6,"omega3":0.55,"mag":58,"pot":237,"fol":27},
{"id":"tofu_silken","name":"Tofu, silken","cat":"Soy","cal":55,"pro":5.3,"carb":2.8,"fat":2.9,"fib":0.7,"iron":1.1,"calc":111,"zinc":0.6,"omega3":0.18,"mag":30,"pot":119,"fol":15},
{"id":"tempeh","name":"Tempeh","cat":"Soy","cal":193,"pro":20.3,"carb":9.4,"fat":10.8,"fib":1.4,"iron":2.7,"calc":111,"zinc":1.1,"omega3":0.37,"mag":81,"pot":412,"fol":24},
{"id":"edamame_frozen","name":"Edamame, frozen","cat":"Soy","cal":121,"pro":11.9,"carb":8.9,"fat":5.2,"fib":5.2,"iron":2.3,"calc":63,"zinc":1.4,"omega3":0.28,"mag":64,"pot":436,"fol":311},
{"id":"soy_milk_unsweetened","name":"Soy milk, unsweetened","cat":"Soy","cal":33,"pro":3.3,"carb":0.7,"fat":1.8,"fib":0.6,"iron":0.6,"calc":25,"zinc":0.3,"b12":0,"vitD":0,"omega3":0.11,"mag":25,"pot":122,"fol":9},
{"id":"tvp_dry","name":"Textured vegetable protein, dry","cat":"Soy","cal":327,"pro":52.0,"carb":34.0,"fat":1.2,"fib":13.0,"iron":9.0,"calc":241,"zinc":4.1,"omega3":0.15,"mag":178,"pot":1800,"fol":300},
{"id":"nutritional_yeast","name":"Nutritional yeast","cat":"Other","cal":325,"pro":50.0,"carb":35.0,"fat":5.0,"fib":20.0,"iron":5.0,"calc":30,"zinc":7.0,"b12":0,"vitD":0,"omega3":0.1,"mag":180,"pot":2100,"fol":300},
{"id":"kale_raw","name":"Kale, raw","cat":"Vegetables","cal":49,"pro":4.3,"carb":8.8,"fat":0.9,"fib":3.6,"iron":1.5,"calc":150,"zinc":0.4,"omega3":0.18,"mag":47,"pot":491,"fol":141},
{"id":"spinach_raw","name":"Spinach, raw","cat":"Vegetables","cal":23,"pro":2.9,"carb":3.6,"fat":0.4,"fib":2.2,"iron":2.7,"calc":99,"zinc":0.5,"omega3":0.14,"mag":79,"pot":558,"fol":194},
{"id":"sweet_potato_baked","name":"Sweet potato, baked","cat":"Vegetables","cal":90,"pro":2.0,"carb":20.7,"fat":0.2,"fib":3.3,"iron":0.7,"calc":38,"zinc":0.3,"omega3":0.01,"mag":27,"pot":475,"fol":11},



{id:"taco_1", name:"Brown rice, cooked", cat:"Other", cal:123.53489250000001, pro:2.58825, carb:25.80975, fat:1.0003333333333333, fib:2.749333333333334, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.262, calc:5.204, zinc:0.6826666666666666, b12:0, vitD:0, omega3:0, iod:1.2446666666666666, sel:0, mag:58.702, pot:75.15166666666666, fol:0},
{id:"taco_2", name:"Rice, brown, raw", cat:"Other", cal:359.6780020326088, pro:7.323285869565217, carb:77.45071413043479, fat:1.8648333333333333, fib:4.819166666666666, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.9483333333333333, calc:7.818000000000001, zinc:1.3951666666666667, b12:0, vitD:0, omega3:0, iod:1.6456666666666666, sel:0, mag:109.71, pot:173.34, fol:0},
{id:"taco_3", name:"Cooked rice, type 1", cat:"Other", cal:128.25848566666664, pro:2.5208166666666667, carb:28.059849999999994, fat:0.22699999999999998, fib:1.561, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.07666666666666666, calc:3.544333333333334, zinc:0.49133333333333334, b12:0, vitD:0, omega3:0, iod:1.2006666666666665, sel:0, mag:2.2533333333333334, pot:14.673666666666668, fol:0},
{id:"taco_4", name:"Rice, type 1, uncooked", cat:"Other", cal:357.789273115942, pro:7.158539855072464, carb:78.75954347826087, fat:0.335, fib:1.6391666666666667, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.6777475, calc:4.414333333333333, zinc:1.2248333333333334, b12:0, vitD:0, omega3:0, iod:1.0191666666666666, sel:0, mag:30.383666666666667, pot:62.49941666666667, fol:0},
{id:"taco_5", name:"Cooked rice, type 2", cat:"Other", cal:130.11964833333332, pro:2.568416666666667, carb:28.19258333333333, fat:0.36166666666666664, fib:1.0696666666666665, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.05033333333333334, calc:3.3336666666666663, zinc:0.5493333333333333, b12:0, vitD:0, omega3:0, iod:1.959666666666667, sel:0, mag:6.053333333333334, pot:20.203333333333333, fol:0},
{id:"taco_6", name:"Rice, type 2, uncooked", cat:"Other", cal:358.1167614565217, pro:7.241882971014494, carb:78.88145036231883, fat:0.2755, fib:1.7198333333333333, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.5978333333333334, calc:4.8335, zinc:1.2720833333333335, b12:0, vitD:0, omega3:0, iod:0.5688333333333334, sel:0, mag:29.239083333333333, pot:57.28458333333333, fol:0},
{id:"taco_7", name:"Raw rolled oats", cat:"Other", cal:393.82268944927546, pro:13.921026086956523, carb:66.63564057971016, fat:8.496666666666666, fib:9.13, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:4.446666666666666, calc:47.89, zinc:2.63, b12:0, vitD:0, omega3:0, iod:4.626666666666667, sel:0, mag:118.76233333333333, pot:336.3333333333333, fol:0},
{id:"taco_8", name:"Biscuit, sweet, cornstarch", cat:"Other", cal:442.8193901449275, pro:8.072521739130433, carb:75.23414492753622, fat:11.966666666666669, fib:2.1, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:1.76, calc:54.45, zinc:1.03, b12:0, vitD:0, omega3:0, iod:352.02666666666664, sel:0, mag:37.14333333333333, pot:141.64, fol:0},
{id:"taco_9", name:"A sweet biscuit filled with chocolate.", cat:"Other", cal:471.824779710145, pro:6.397217391304348, carb:70.54944927536232, fat:19.583333333333332, fib:2.956666666666667, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:2.27, calc:27.23, zinc:0.9933333333333333, b12:0, vitD:0, omega3:0, iod:239.2, sel:0, mag:47.97666666666667, pot:232.4, fol:0},
{id:"taco_10", name:"Sweet cookie filled with strawberry.", cat:"Other", cal:471.1747362318841, pro:5.719826086956521, carb:71.01350724637682, fat:19.573333333333334, fib:1.5333333333333332, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:1.48, calc:35.78, zinc:0.7266666666666666, b12:0, vitD:0, omega3:0, iod:229.8166666666667, sel:0, mag:27.1, pot:113.01333333333334, fol:0},
{id:"taco_11", name:"Biscuit, sweet, wafer, filled with chocolate.", cat:"Other", cal:502.4568579710144, pro:5.564521739130435, carb:67.53547826086955, fat:24.673333333333332, fib:1.8033333333333335, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:2.4433333333333334, calc:23.343333333333334, zinc:0.8733333333333334, b12:0, vitD:0, omega3:0, iod:137.24, sel:0, mag:47.85333333333333, pot:240.45333333333335, fol:0},
{id:"taco_12", name:"Strawberry-filled cookie, sweet, wafer", cat:"Other", cal:513.4461826086956, pro:4.517043478260871, carb:67.35295652173913, fat:26.4, fib:0.82, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:1.0933333333333335, calc:13.706666666666665, zinc:0.5133333333333333, b12:0, vitD:0, omega3:0, iod:119.9, sel:0, mag:18.54, pot:74.84333333333333, fol:0},
{id:"taco_13", name:"Salted biscuit, cream cracker", cat:"Other", cal:431.73228115942027, pro:10.055130434782608, carb:68.73153623188405, fat:14.436666666666667, fib:2.51, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:2.2, calc:20.003333333333334, zinc:1.1366666666666667, b12:0, vitD:0, omega3:0, iod:854.3566666666667, sel:0, mag:39.74666666666667, pot:180.61333333333334, fol:0},
{id:"taco_14", name:"Cake mix for", cat:"Other", cal:418.6333333333333, pro:6.159420289855073, carb:84.71391304347826, fat:6.126666666666666, fib:1.7033333333333331, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:1.2106666666666666, calc:58.879, zinc:0.5826666666666667, b12:0, vitD:0, omega3:0, iod:462.88, sel:0, mag:27.921999999999997, pot:75.363, fol:0},
{id:"taco_15", name:"Cake, ready, cassava", cat:"Other", cal:323.85166666666663, pro:4.416666666666667, carb:47.864, fat:12.747666666666667, fib:0.6906666666666667, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.48900000000000005, calc:85.02233333333334, zinc:0.41566666666666663, b12:0, vitD:0, omega3:0, iod:111.00833333333333, sel:0, mag:10.344, pot:134.82266666666666, fol:0},
{id:"taco_16", name:"Cake, ready, chocolate", cat:"Other", cal:410.01366666666667, pro:6.222916666666666, carb:54.71775, fat:18.472333333333335, fib:1.43, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:2.1323333333333334, calc:74.58466666666668, zinc:0.7136666666666667, b12:0, vitD:0, omega3:0, iod:283.3, sel:0, mag:27.686666666666667, pot:211.76333333333332, fol:0},
{id:"taco_17", name:"Bolo, pronto, coco", cat:"Grains", cal:333.4376666666667, pro:5.666666666666666, carb:52.276, fat:11.296333333333331, fib:1.055, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.848, calc:57.105333333333334, zinc:0.6756666666666667, b12:0, vitD:0, omega3:0, iod:190.33866666666665, sel:0, mag:16.251666666666665, pot:143.294, fol:0},
{id:"taco_18", name:"Cake, ready, corn", cat:"Other", cal:311.387, pro:4.804166666666667, carb:45.10883333333334, fat:12.415, fib:0.71, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.65, calc:82.58466666666666, zinc:0.435, b12:0, vitD:0, omega3:0, iod:133.811, sel:0, mag:10.249, pot:118.42733333333335, fol:0},
{id:"taco_19", name:"Canjica, white, raw", cat:"Grains", cal:357.60258999999996, pro:7.2, carb:78.06099999999999, fat:0.9710000000000001, fib:5.499333333333333, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.32166666666666666, calc:1.9646666666666668, zinc:0.36233333333333334, b12:0, vitD:0, omega3:0, iod:0.7896666666666666, sel:0, mag:12.325, pot:92.94733333333333, fol:0},
{id:"taco_20", name:"Canjica, with whole milk", cat:"Grains", cal:112.45677722046528, pro:2.3606000423431395, carb:23.62773329099018, fat:1.2443333333333335, fib:1.2166666666666666, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.055999999999999994, calc:42.562666666666665, zinc:0.278, b12:0, vitD:0, omega3:0, iod:27.58666666666667, sel:0, mag:5.838333333333334, pot:69.809, fol:0},
{id:"taco_21", name:"Cereals, corn flakes, with salt", cat:"Grains", cal:369.59975000000003, pro:7.291666666666667, carb:80.835, fat:1.6033333333333335, fib:5.293333333333333, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.5243333333333333, calc:1.8136666666666665, zinc:0.6110000000000001, b12:0, vitD:0, omega3:0, iod:271.73766666666666, sel:0, mag:20.096, pot:68.66, fol:0},
{id:"taco_22", name:"Cereals, corn flakes, unsalted", cat:"Grains", cal:363.3383166666666, pro:6.875, carb:80.44833333333334, fat:1.1833333333333333, fib:1.8366666666666667, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:1.6933333333333334, calc:1.9746666666666666, zinc:0.3256666666666667, b12:0, vitD:0, omega3:0, iod:30.970333333333333, sel:0, mag:16.548666666666666, pot:28.697333333333333, fol:0},
{id:"taco_23", name:"Cereals, porridge, corn, children's", cat:"Grains", cal:394.42752173913044, pro:6.431159420289855, carb:87.26550724637681, fat:1.0933333333333335, fib:3.2133333333333334, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:3.03, calc:218.80666666666664, zinc:0.3633333333333333, b12:0, vitD:0, omega3:0, iod:399.40333333333336, sel:0, mag:16.03, pot:82.01666666666667, fol:0},
{id:"taco_24", name:"Cereals, vitamin mix, wheat, barley and oats", cat:"Grains", cal:381.1333333333333, pro:8.895833333333332, carb:81.6175, fat:2.12, fib:4.983333333333333, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:12.641333333333334, calc:584.2513333333334, zinc:2.0223333333333335, b12:0, vitD:0, omega3:0, iod:1163.2569999999998, sel:0, mag:72.268, pot:244.361, fol:0},
{id:"taco_25", name:"Breakfast cereal, corn", cat:"Grains", cal:365.354163768116, pro:7.155797101449275, carb:83.82420289855072, fat:0.9566666666666667, fib:4.116666666666666, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:3.05, calc:142.92333333333332, zinc:7.63, b12:0, vitD:0, omega3:0, iod:654.5433333333334, sel:0, mag:10.933333333333332, pot:83.08666666666666, fol:0},
{id:"taco_26", name:"Breakfast cereal, corn, sugar", cat:"Grains", cal:376.55525362318843, pro:4.742753623188407, carb:88.84057971014492, fat:0.6666666666666666, fib:2.106666666666667, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:3.9033333333333338, calc:56.42333333333334, zinc:8.48, b12:0, vitD:0, omega3:0, iod:405.31333333333333, sel:0, mag:7.94, pot:51.59666666666667, fol:0},
{id:"taco_27", name:"Rice cream, powder", cat:"Other", cal:386.00119033639794, pro:7.026949774742127, carb:83.86938355859121, fat:1.2260000000000002, fib:1.0713333333333332, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.6323333333333333, calc:7.085333333333334, zinc:1.8636666666666668, b12:0, vitD:0, omega3:0, iod:1.0303333333333333, sel:0, mag:50.50333333333333, pot:114.68033333333334, fol:0},
{id:"taco_28", name:"Corn cream, powder", cat:"Other", cal:333.03419267054403, pro:4.820833333333333, carb:86.1485, fat:1.639333333333333, fib:3.7223333333333333, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:4.257000000000001, calc:323.16333333333336, zinc:0.7806666666666667, b12:0, vitD:0, omega3:0, iod:593.7936666666666, sel:0, mag:30.06233333333333, pot:165.72366666666667, fol:0},
{id:"taco_29", name:"Curau, green corn", cat:"Other", cal:78.43381831365585, pro:2.3606000423431395, carb:13.944399957656858, fat:1.6369999999999998, fib:0.4566666666666667, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.44933333333333336, calc:52.596000000000004, zinc:0.4, b12:0, vitD:0, omega3:0, iod:20.512, sel:0, mag:15.961333333333334, pot:161.84233333333333, fol:0},
{id:"taco_30", name:"Curau, green corn, mixture for", cat:"Other", cal:402.28657743531465, pro:2.2229166666666664, carb:79.81641666666667, fat:13.371333333333334, fib:2.5226666666666664, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.8626666666666667, calc:30.878, zinc:0.24066666666666667, b12:0, vitD:0, omega3:0, iod:222.92566666666667, sel:0, mag:8.500666666666666, pot:55.33533333333333, fol:0},
{id:"taco_31", name:"Enriched rice flour", cat:"Other", cal:363.0564801812235, pro:1.2693332926432292, carb:85.50400004069012, fat:0.3, fib:0.58, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:31.38333333333333, calc:1.1226666666666667, zinc:8.48, b12:0, vitD:0, omega3:0, iod:17.101666666666667, sel:0, mag:4.3, pot:12.540666666666667, fol:0},
{id:"taco_32", name:"Whole rye flour", cat:"Other", cal:335.77766279932655, pro:12.515066502888997, carb:73.29826683044433, fat:1.7533333333333332, fib:15.48, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:4.73, calc:33.916666666666664, zinc:2.6633333333333336, b12:0, vitD:0, omega3:0, iod:41.376666666666665, sel:0, mag:120.23333333333333, pot:333.62, fol:0},
{id:"taco_33", name:"Yellow corn flour", cat:"Other", cal:350.58693322738014, pro:7.1875, carb:79.07916666666665, fat:1.4666666666666666, fib:5.49, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:2.252666666666667, calc:1.285, zinc:0.5983333333333333, b12:0, vitD:0, omega3:0, iod:44.93233333333334, sel:0, mag:30.955, pot:57.85366666666666, fol:0},
{id:"taco_34", name:"Breadcrumbs", cat:"Other", cal:370.5780966666666, pro:11.380999619166056, carb:75.78566666666666, fat:1.4633333333333332, fib:4.823333333333333, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:6.733666666666667, calc:35.29933333333333, zinc:1.6713333333333333, b12:0, vitD:0, omega3:0, iod:332.5, sel:0, mag:56.87966666666667, pot:212.144, fol:0},
{id:"taco_35", name:"Wheat flour", cat:"Other", cal:360.4729785507247, pro:9.79078260869565, carb:75.09255072463769, fat:1.366666666666667, fib:2.3466666666666667, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.95, calc:17.863333333333333, zinc:0.8266666666666667, b12:0, vitD:0, omega3:0, iod:0.7366666666666667, sel:0, mag:31.00333333333333, pot:151.36666666666667, fol:0},
{id:"taco_36", name:"Flour, dairy, cereals", cat:"Grains", cal:414.8505173913043, pro:11.87913043478261, carb:77.77086956521738, fat:5.79, fib:1.94, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:8.723333333333334, calc:196.06333333333336, zinc:1.7266666666666666, b12:0, vitD:0, omega3:0, iod:125.07333333333332, sel:0, mag:57.68666666666667, pot:365.6033333333333, fol:0},
{id:"taco_37", name:"Lasagna, fresh pasta, cooked", cat:"Other", cal:163.76366666666667, pro:5.8125, carb:32.52216666666667, fat:1.1583333333333332, fib:1.6363333333333332, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:1.1886666666666665, calc:9.971666666666666, zinc:0.405, b12:0, vitD:0, omega3:0, iod:206.76933333333332, sel:0, mag:3.539, pot:53.91466666666667, fol:0},
{id:"taco_38", name:"Lasagna, fresh, uncooked pasta", cat:"Other", cal:220.3056666666667, pro:7.008333333333333, carb:45.05833333333334, fat:1.3376666666666666, fib:1.6063333333333334, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:1.8723333333333334, calc:16.545666666666666, zinc:0.7556666666666668, b12:0, vitD:0, omega3:0, iod:666.7103333333333, sel:0, mag:12.591666666666667, pot:136.607, fol:0},
{id:"taco_39", name:"Instant noodles", cat:"Other", cal:435.8647805333334, pro:8.79168, carb:62.431653333333344, fat:17.236666666666668, fib:5.61, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.8, calc:17.62666666666667, zinc:0.5033333333333333, b12:0, vitD:0, omega3:0, iod:1515.5266666666666, sel:0, mag:19.366666666666664, pot:147.92, fol:0},
{id:"taco_40", name:"Noodles, wheat, raw", cat:"Other", cal:371.1226130434783, pro:9.995652173913044, carb:77.94434782608695, fat:1.3033333333333335, fib:2.9266666666666663, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.88, calc:17.3, zinc:0.7766666666666667, b12:0, vitD:0, omega3:0, iod:7.17, sel:0, mag:27.69, pot:147.06, fol:0},
{id:"taco_41", name:"Noodles, wheat, raw, with eggs", cat:"Other", cal:370.5671133333334, pro:10.320799999999998, carb:76.62253333333335, fat:1.97, fib:2.2966666666666664, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.9166666666666666, calc:19.453333333333333, zinc:0.8133333333333335, b12:0, vitD:0, omega3:0, iod:14.74, sel:0, mag:0, pot:134.0966666666667, fol:0},
{id:"taco_42", name:"Corn, starch, raw", cat:"Other", cal:361.36682387826096, pro:0.5978260869565217, carb:87.14884391304349, fat:0, fib:0.7433333, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.12766666666666668, calc:1.0576666666666668, zinc:0.07966666666666666, b12:0, vitD:0, omega3:0, iod:8.083, sel:0, mag:3.0276666666666667, pot:8.535, fol:0},
{id:"taco_43", name:"Corn, cornmeal, raw", cat:"Other", cal:353.482268115942, pro:7.213768115942029, carb:78.87289855072463, fat:1.9033333333333333, fib:4.713333333333334, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.85, calc:2.6666666666666665, zinc:1.0933333333333333, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:41.23, pot:168.33333333333334, fol:0},
{id:"taco_44", name:"Corn, green, raw", cat:"Other", cal:138.166565, pro:6.589583333333334, carb:28.555749999999996, fat:0.609, fib:3.9180000000000006, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.411, calc:1.6123333333333332, zinc:0.5176666666666666, b12:0, vitD:0, omega3:0, iod:1.1156666666666666, sel:0, mag:32.575, pot:184.82233333333332, fol:0},
{id:"taco_45", name:"Corn, green, canned, drained", cat:"Other", cal:97.56489420289851, pro:3.2282608695652177, carb:17.135072463768108, fat:2.353333333333333, fib:4.6433333333333335, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.5856666666666667, calc:2.1673333333333336, zinc:0.49833333333333335, b12:0, vitD:0, omega3:0, iod:260.3499, sel:0, mag:20.37633333333333, pot:162.02333333333334, fol:0},
{id:"taco_46", name:"Traditional porridge, powder", cat:"Other", cal:373.4214666666667, pro:0.5833333333333334, carb:89.33666666666667, fat:0.37, fib:0.88, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:41.99133333333334, calc:522.0466666666667, zinc:15.209333333333333, b12:0, vitD:0, omega3:0, iod:14.855333333333334, sel:0, mag:4.280666666666666, pot:0, fol:0},
{id:"taco_47", name:"Pamonha, cooking bar, pre-cooked", cat:"Grains", cal:171.2191116666667, pro:2.5520833333333335, carb:30.68491666666667, fat:4.849666666666667, fib:2.371, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.35666666666666663, calc:4.164333333333333, zinc:0.42366666666666664, b12:0, vitD:0, omega3:0, iod:131.993, sel:0, mag:15.347, pot:125.34933333333333, fol:0},
{id:"taco_48", name:"Bread, oats, shape", cat:"Other", cal:343.0853666666667, pro:12.35, carb:59.56666666666666, fat:5.693333333333334, fib:5.98, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:4.731999999999999, calc:108.69099999999999, zinc:1.7306666666666668, b12:0, vitD:0, omega3:0, iod:605.7629999999999, sel:0, mag:56.68033333333333, pot:210.08333333333334, fol:0},
{id:"taco_49", name:"Soy bread", cat:"Other", cal:308.7263233333333, pro:11.343, carb:56.510333333333335, fat:3.58, fib:5.706666666666667, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:3.3303333333333334, calc:90.23733333333332, zinc:1.4586666666666668, b12:0, vitD:0, omega3:0, iod:662.5413333333333, sel:0, mag:48.31833333333333, pot:296.348, fol:0},
{id:"taco_50", name:"Bread, gluten, shape", cat:"Other", cal:252.99402999999998, pro:11.950999600092567, carb:44.11899999999999, fat:2.7266666666666666, fib:2.48, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:5.710333333333334, calc:155.721, zinc:1.2843333333333333, b12:0, vitD:0, omega3:0, iod:22.045333333333335, sel:0, mag:24.243666666666666, pot:64.73233333333333, fol:0},
{id:"taco_51", name:"Bread, corn, shape", cat:"Other", cal:292.01349, pro:8.303, carb:56.397, fat:3.11, fib:4.296666666666666, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:3.044333333333333, calc:77.84866666666666, zinc:0.8176666666666668, b12:0, vitD:0, omega3:0, iod:506.64399999999995, sel:0, mag:29.415666666666667, pot:89.02466666666668, fol:0},
{id:"taco_52", name:"Bread, wheat, shape, wholemeal", cat:"Other", cal:253.19361833333332, pro:9.425166666666666, carb:49.9415, fat:3.6533333333333338, fib:6.883333333333333, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:2.985333333333333, calc:131.75966666666667, zinc:1.5856666666666668, b12:0, vitD:0, omega3:0, iod:506.1033333333333, sel:0, mag:60.428333333333335, pot:162.871, fol:0},
{id:"taco_53", name:"Bread, wheat, French", cat:"Other", cal:299.8101504347826, pro:7.953565217391304, carb:58.646434782608694, fat:3.1033333333333335, fib:2.3066666666666666, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:1.0, calc:15.753333333333336, zinc:0.7633333333333333, b12:0, vitD:0, omega3:0, iod:647.6733333333334, sel:0, mag:25.463333333333335, pot:142.2, fol:0},
{id:"taco_54", name:"Bread, wheat, kneaded", cat:"Other", cal:310.96494, pro:8.398, carb:61.452, fat:2.84, fib:2.433333333333333, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:2.2686666666666664, calc:51.617999999999995, zinc:2.6616666666666666, b12:0, vitD:0, omega3:0, iod:430.792, sel:0, mag:22.220333333333333, pot:91.16600000000001, fol:0},
{id:"taco_55", name:"Pastel, de carne, cru", cat:"Grains", cal:288.70207151598953, pro:10.74069964059194, carb:42.01663369274139, fat:8.793, fib:1.04, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:1.9910000000000003, calc:16.691666666666666, zinc:1.659, b12:0, vitD:0, omega3:0, iod:1309.265, sel:0, mag:17.705, pot:165.61033333333333, fol:0},
{id:"taco_56", name:"Fried meat pie", cat:"Other", cal:388.37465162496756, pro:10.104199661890666, carb:43.76780033810934, fat:20.136666666666667, fib:0.9866666666666667, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:2.5076666666666667, calc:12.554666666666668, zinc:1.15, b12:0, vitD:0, omega3:0, iod:1039.8886666666667, sel:0, mag:14.444666666666665, pot:155.643, fol:0},
{id:"taco_57", name:"Pastel, de queijo, bruto", cat:"Grains", cal:308.4744338873742, pro:9.853399670282998, carb:45.947933663050335, fat:9.634666666666666, fib:1.1066666666666667, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.9906666666666667, calc:154.698, zinc:0.9663333333333334, b12:0, vitD:0, omega3:0, iod:984.5696666666666, sel:0, mag:15.805333333333332, pot:102.57833333333333, fol:0},
{id:"taco_58", name:"Fried cheese pastry", cat:"Other", cal:422.11208003931927, pro:8.709599708557128, carb:48.1327336247762, fat:22.670333333333332, fib:0.9433333333333334, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:1.3423333333333334, calc:126.12766666666668, zinc:0.7623333333333333, b12:0, vitD:0, omega3:0, iod:821.3823333333333, sel:0, mag:14.738333333333335, pot:123.75466666666667, fol:0},
{id:"taco_59", name:"Pastry, dough, raw", cat:"Other", cal:310.2025143333333, pro:6.9027, carb:57.379633333333324, fat:5.477, fib:1.4133333333333333, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:1.0553333333333332, calc:12.613999999999999, zinc:0.6073333333333333, b12:0, vitD:0, omega3:0, iod:1344.2013333333332, sel:0, mag:14.430666666666667, pot:166.68166666666664, fol:0},
{id:"taco_60", name:"Pastel, dough, fried", cat:"Grains", cal:569.6724593333333, pro:6.0192000000000005, carb:49.34313333333334, fat:40.86033333333334, fib:1.3093333333333332, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:1.4466666666666665, calc:11.265666666666666, zinc:0.5216666666666666, b12:0, vitD:0, omega3:0, iod:1174.6670000000001, sel:0, mag:12.740333333333334, pot:142.554, fol:0},
{id:"taco_61", name:"Popcorn, made with soybean oil, without salt.", cat:"Other", cal:448.334261847198, pro:9.927083333333336, carb:70.31258333333334, fat:15.940999999999997, fib:14.336666666666666, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:1.157333333333333, calc:2.8253333333333335, zinc:2.0463333333333336, b12:0, vitD:0, omega3:0, iod:4.320333333333334, sel:0, mag:90.75733333333335, pot:255.95666666666668, fol:0},
{id:"taco_62", name:"Pre-cooked polenta", cat:"Other", cal:102.74116666666669, pro:2.291666666666667, carb:23.311666666666667, fat:0.3033333333333333, fib:2.4033333333333333, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0, calc:1.0939999999999999, zinc:0.050666666666666665, b12:0, vitD:0, omega3:0, iod:441.88933333333335, sel:0, mag:4.428999999999999, pot:99.63700000000001, fol:0},
{id:"taco_63", name:"Toast, French bread", cat:"Other", cal:377.422283, pro:10.524100000000002, carb:74.5559, fat:3.3009999999999997, fib:3.395, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:1.2386666666666666, calc:18.744666666666664, zinc:0.905, b12:0, vitD:0, omega3:0, iod:829.4923333333332, sel:0, mag:31.597333333333335, pot:189.48933333333332, fol:0},
{id:"taco_64", name:"Pumpkin, kabocha, cooked", cat:"Other", cal:48.04374250000001, pro:1.44375, carb:10.760916666666668, fat:0.7293333333333333, fib:2.462666666666667, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.3453333333333333, calc:7.6256666666666675, zinc:0.28633333333333333, b12:0, vitD:0, omega3:0, iod:1.4516666666666669, sel:0, mag:9.110999999999999, pot:199.10233333333335, fol:0},
{id:"taco_65", name:"Pumpkin, kabocha, raw", cat:"Other", cal:38.59929420289856, pro:1.7463768115942029, carb:8.360289855072468, fat:0.5366666666666667, fib:2.1666666666666665, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.37333333333333335, calc:17.963333333333335, zinc:0.32, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:8.82, pot:350.56, fol:0},
{id:"taco_66", name:"Pumpkin, Brazilian girl, raw", cat:"Other", cal:13.605673913043486, pro:0.6086956521739131, carb:3.3013043478260893, fat:0, fib:1.17, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.15, calc:8.74, zinc:0, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:4.09, pot:164.6, fol:0},
{id:"taco_67", name:"Pumpkin, squash, raw", cat:"Other", cal:12.364436231884042, pro:0.9601449275362318, carb:2.6665217391304306, fat:0.06, fib:1.7033333333333331, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0, calc:3.0476666666666667, zinc:0.07, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:1.8476666666666663, pot:124.86533333333334, fol:0},
{id:"taco_68", name:"Pumpkin, squash, sautéed", cat:"Other", cal:29.003822031756222, pro:0.39375, carb:5.981916666666661, fat:0.799, fib:1.5466666666666669, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.11299999999999999, calc:19.08, zinc:0.08266666666666667, b12:0, vitD:0, omega3:0, iod:3.0276666666666667, sel:0, mag:7.492333333333334, pot:183.19333333333336, fol:0},
{id:"taco_69", name:"Pumpkin, neck, raw", cat:"Other", cal:24.466267949700352, pro:0.6708333333333334, carb:6.122833333333339, fat:0.11599999999999999, fib:2.300333333333333, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.275, calc:8.808, zinc:0.17666666666666667, b12:0, vitD:0, omega3:0, iod:0.745, sel:0, mag:7.421, pot:263.87600000000003, fol:0},
{id:"taco_70", name:"Italian zucchini, cooked", cat:"Other", cal:15.038520000000023, pro:1.125, carb:2.977000000000007, fat:0.19899999999999998, fib:1.588, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.15966666666666668, calc:16.725666666666665, zinc:0.25733333333333336, b12:0, vitD:0, omega3:0, iod:0.8326666666666668, sel:0, mag:16.859666666666666, pot:125.879, fol:0},
{id:"taco_71", name:"Raw Italian zucchini", cat:"Other", cal:19.279126086956484, pro:1.141304347826087, carb:4.292028985507236, fat:0.14, fib:1.3533333333333335, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.24333333333333332, calc:15.126666666666665, zinc:0.16666666666666666, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:19.946666666666662, pot:253.38, fol:0},
{id:"taco_72", name:"Sautéed Italian zucchini", cat:"Other", cal:24.42960218765336, pro:1.06875, carb:4.18691666666666, fat:0.8213333333333334, fib:1.38, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.35800000000000004, calc:20.672, zinc:0.272, b12:0, vitD:0, omega3:0, iod:2.209, sel:0, mag:12.667000000000002, pot:193.62666666666667, fol:0},
{id:"taco_73", name:"Zucchini, Paulista style, raw", cat:"Other", cal:30.810702228816336, pro:0.6395833333333333, carb:7.867419999999999, fat:0.139, fib:2.605, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.17, calc:18.67, zinc:0.17699999999999996, b12:0, vitD:0, omega3:0, iod:0.5006666666666667, sel:0, mag:9.39, pot:212.87133333333335, fol:0},
{id:"taco_74", name:"Chard, raw", cat:"Other", cal:20.942342499999942, pro:1.44375, carb:4.630916666666657, fat:0.106, fib:1.122, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.26933333333333337, calc:42.985, zinc:0.30633333333333335, b12:0, vitD:0, omega3:0, iod:1.1806666666666668, sel:0, mag:10.395333333333333, pot:239.8166666666667, fol:0},
{id:"taco_75", name:"Watercress, raw", cat:"Other", cal:16.578801449275325, pro:2.6884057971014492, carb:2.2515942028985423, fat:0.23666666666666666, fib:2.1366666666666667, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:3.106666666666667, calc:132.53, zinc:0.7233333333333333, b12:0, vitD:0, omega3:0, iod:7.4623333333333335, sel:0, mag:18.16333333333333, pot:217.66, fol:0},
{id:"taco_76", name:"Celery, raw", cat:"Other", cal:19.09145664497062, pro:0.7583333333333333, carb:4.272333333333345, fat:0.069, fib:0.9569999999999999, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.7203333333333334, calc:65.22466666666666, zinc:0.14266666666666664, b12:0, vitD:0, omega3:0, iod:9.515666666666666, sel:0, mag:8.860333333333333, pot:273.60366666666664, fol:0},
{id:"taco_77", name:"Raw iceberg lettuce", cat:"Other", cal:8.794903236866052, pro:0.6083333333333334, carb:1.7453333333333474, fat:0.129, fib:1.0216666666666667, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.26666666666666666, calc:14.444666666666668, zinc:0.22633333333333336, b12:0, vitD:0, omega3:0, iod:7.308333333333333, sel:0, mag:5.7366666666666655, pot:136.00300000000001, fol:0},
{id:"taco_78", name:"Raw curly lettuce", cat:"Other", cal:10.68085652173921, pro:1.3478260869565217, carb:1.6955072463768253, fat:0.16, fib:1.8266666666666669, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.39666666666666667, calc:37.98, zinc:0.25333333333333335, b12:0, vitD:0, omega3:0, iod:3.38, sel:0, mag:10.97, pot:267.13333333333327, fol:0},
{id:"taco_79", name:"Lettuce, smooth, raw", cat:"Other", cal:13.820901449275343, pro:1.6884057971014494, carb:2.428260869565218, fat:0.12333333333333334, fib:2.33, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.61, calc:27.513333333333335, zinc:0.3466666666666667, b12:0, vitD:0, omega3:0, iod:4.233333333333333, sel:0, mag:9.106666666666667, pot:348.71, fol:0},
{id:"taco_80", name:"Raw purple lettuce", cat:"Other", cal:12.716997363467993, pro:0.90625, carb:2.4934166666666613, fat:0.19166666666666665, fib:2.013333333333333, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:2.4770000000000003, calc:33.82833333333333, zinc:0.23466666666666666, b12:0, vitD:0, omega3:0, iod:7.124333333333333, sel:0, mag:9.311, pot:308.43533333333335, fol:0},
{id:"taco_81", name:"Raw basil", cat:"Other", cal:29.183613081057864, pro:2.658333333333333, carb:5.240999999999999, fat:0.47633333333333333, fib:4.140333333333333, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:1.2563333333333333, calc:258.4976666666667, zinc:0.706, b12:0, vitD:0, omega3:0, iod:4.550333333333334, sel:0, mag:84.23833333333334, pot:260.7176666666667, fol:0},
{id:"taco_82", name:"Garlic, raw", cat:"Other", cal:113.12987826086957, pro:7.010869565217391, carb:23.905797101449277, fat:0.22, fib:4.323333333333333, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.8, calc:13.56, zinc:0.82, b12:0, vitD:0, omega3:0, iod:5.36, sel:0, mag:21.293333333333333, pot:534.8866666666667, fol:0},
{id:"taco_83", name:"Leek, raw", cat:"Other", cal:31.5079193532467, pro:1.4125, carb:6.878166666666669, fat:0.1396666666666667, fib:2.506666666666667, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.6406666666666667, calc:33.61633333333334, zinc:0.24066666666666667, b12:0, vitD:0, omega3:0, iod:1.7623333333333333, sel:0, mag:10.694666666666668, pot:224.46633333333332, fol:0},
{id:"taco_84", name:"Raw chicory", cat:"Other", cal:18.034428985507237, pro:1.7681159420289856, carb:3.3352173913043464, fat:0.21666666666666667, fib:2.586666666666667, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.7433333333333333, calc:19.49533333333333, zinc:0.2866666666666667, b12:0, vitD:0, omega3:0, iod:2.3506666666666667, sel:0, mag:21.11, pot:369.12, fol:0},
{id:"taco_85", name:"Sautéed chicory", cat:"Other", cal:65.08191082886853, pro:1.7041666666666666, carb:5.701499999999994, fat:4.847, fib:3.4276666666666666, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:1.5506666666666666, calc:63.40366666666667, zinc:0.19099999999999998, b12:0, vitD:0, omega3:0, iod:14.515, sel:0, mag:17.284000000000002, pot:315.35566666666665, fol:0},
{id:"taco_86", name:"Potato, baroa, boiled", cat:"Other", cal:80.11976250000004, pro:0.8520833333333333, carb:18.947583333333334, fat:0.16633333333333333, fib:1.7579999999999998, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.42366666666666664, calc:11.85, zinc:0.3786666666666667, b12:0, vitD:0, omega3:0, iod:2.0980000000000003, sel:0, mag:7.576, pot:258.32666666666665, fol:0},
{id:"taco_87", name:"Potato, baroa, raw", cat:"Other", cal:100.98492318840582, pro:1.047101449275362, carb:23.982898550724638, fat:0.17, fib:2.063333333333333, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.3033333333333333, calc:17.12666666666667, zinc:0.20333333333333337, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:11.993333333333334, pot:505.18333333333334, fol:0},
{id:"taco_88", name:"Sweet potato, boiled", cat:"Other", cal:76.75961050343517, pro:0.6416666666666667, carb:18.422333333333338, fat:0.08766666666666667, fib:2.212, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.18699999999999997, calc:17.153000000000002, zinc:0.12333333333333334, b12:0, vitD:0, omega3:0, iod:2.699, sel:0, mag:11.159666666666666, pot:148.44, fol:0},
{id:"taco_89", name:"Potato, sweet, raw", cat:"Other", cal:118.24137536231882, pro:1.257246376811594, carb:28.19608695652174, fat:0.13333333333333333, fib:2.573333333333333, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.3866666666666667, calc:21.11, zinc:0.2, b12:0, vitD:0, omega3:0, iod:8.773333333333333, sel:0, mag:16.893333333333334, pot:340.2033333333333, fol:0},
{id:"taco_90", name:"Potato, fried, chip-type, industrially produced", cat:"Other", cal:542.7346733841896, pro:5.583333333333332, carb:51.22233333333333, fat:36.615, fib:2.4556666666666667, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.6956666666666665, calc:11.597666666666667, zinc:0.5876666666666667, b12:0, vitD:0, omega3:0, iod:607.3993333333333, sel:0, mag:24.239333333333335, pot:1014.325, fol:0},
{id:"taco_91", name:"Potato, English style, boiled", cat:"Other", cal:51.588476636270656, pro:1.1645833333333333, carb:11.94375, fat:0, fib:1.3433333333333335, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.19400000000000003, calc:3.52, zinc:0.18766666666666665, b12:0, vitD:0, omega3:0, iod:2.2936666666666667, sel:0, mag:5.425, pot:161.33166666666668, fol:0},
{id:"taco_92", name:"Potato, English, raw", cat:"Other", cal:64.3702260869565, pro:1.7717391304347823, carb:14.688260869565212, fat:0, fib:1.1633333333333333, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.36, calc:3.55, zinc:0.24, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:14.58, pot:302.05333333333334, fol:0},
{id:"taco_93", name:"Potato, English, fried", cat:"Other", cal:267.15742250204084, pro:4.966666666666667, carb:35.64033333333333, fat:13.108666666666666, fib:8.059333333333333, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.4443333333333333, calc:6.2763333333333335, zinc:0.37600000000000006, b12:0, vitD:0, omega3:0, iod:1.913, sel:0, mag:14.114333333333335, pot:488.94166666666666, fol:0},
{id:"taco_94", name:"Potato, English style, sautéed", cat:"Other", cal:67.88793615063032, pro:1.2916666666666667, carb:14.093000000000005, fat:0.8963333333333333, fib:1.377, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.25, calc:4.181, zinc:0.20833333333333334, b12:0, vitD:0, omega3:0, iod:8.182, sel:0, mag:6.456333333333333, pot:199.48166666666665, fol:0},
{id:"taco_95", name:"Eggplant, cooked", cat:"Other", cal:18.845285556813074, pro:0.6770833333333334, carb:4.468249999999995, fat:0.14833333333333332, fib:2.5243333333333333, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.22033333333333335, calc:10.771333333333333, zinc:0.13233333333333333, b12:0, vitD:0, omega3:0, iod:1.325, sel:0, mag:8.815666666666667, pot:105.48, fol:0},
{id:"taco_96", name:"Raw eggplant", cat:"Other", cal:19.62775362318839, pro:1.221014492753623, carb:4.428985507246369, fat:0.1, fib:2.873333333333333, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.24666666666666667, calc:9.22, zinc:0.12, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:12.913333333333332, pot:204.54666666666665, fol:0},
{id:"taco_97", name:"Beetroot, cooked", cat:"Other", cal:32.15432433140276, pro:1.29375, carb:7.234916666666663, fat:0.09266666666666667, fib:1.8786666666666665, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.23866666666666667, calc:15.255333333333333, zinc:0.35366666666666663, b12:0, vitD:0, omega3:0, iod:22.761666666666667, sel:0, mag:16.541666666666668, pot:245.48333333333335, fol:0},
{id:"taco_98", name:"Beetroot, raw", cat:"Other", cal:48.82850869565215, pro:1.9456521739130435, carb:11.111014492753624, fat:0.09, fib:3.3733333333333335, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.32, calc:18.113333333333333, zinc:0.5166666666666667, b12:0, vitD:0, omega3:0, iod:9.72, sel:0, mag:24.433333333333337, pot:375.0733333333333, fol:0},
{id:"taco_99", name:"Biscuit, sweet tapioca starch", cat:"Other", cal:437.54900000000004, pro:1.2916666666666667, carb:80.53533333333334, fat:12.249, fib:1.159, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:1.766333333333333, calc:30.454333333333334, zinc:0.145, b12:0, vitD:0, omega3:0, iod:97.80133333333333, sel:0, mag:5.845, pot:53.57933333333333, fol:0},
{id:"taco_100", name:"Broccoli, cooked", cat:"Other", cal:24.63616311136879, pro:2.1333333333333333, carb:4.366666666666663, fat:0.459, fib:3.4166666666666665, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.535, calc:50.754, zinc:0.239, b12:0, vitD:0, omega3:0, iod:2.122, sel:0, mag:14.546666666666667, pot:118.54333333333334, fol:0},
{id:"taco_101", name:"Broccoli, raw", cat:"Other", cal:25.495131884057955, pro:3.6449275362318847, carb:4.025072463768115, fat:0.26666666666666666, fib:2.88, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.61, calc:85.87, zinc:0.4766666666666666, b12:0, vitD:0, omega3:0, iod:3.3333333333333335, sel:0, mag:29.566666666666666, pot:322.11, fol:0},
{id:"taco_102", name:"Yam, cooked", cat:"Other", cal:77.58491333333336, pro:1.5291666666666668, carb:18.8525, fat:0.11233333333333334, fib:2.6346666666666665, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.30833333333333335, calc:5.168333333333334, zinc:0.23766666666666666, b12:0, vitD:0, omega3:0, iod:1.0063333333333333, sel:0, mag:14.838666666666667, pot:203.25233333333335, fol:0},
{id:"taco_103", name:"Yam, raw", cat:"Other", cal:95.6331347826087, pro:2.282608695652174, carb:22.954057971014496, fat:0.1366666666666667, fib:7.273333333333333, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.21333333333333335, calc:3.9113333333333338, zinc:0.18, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:11.466666666666667, pot:211.66566666666668, fol:0},
{id:"taco_104", name:"Caruru, raw", cat:"Other", cal:34.03162971734997, pro:3.2, carb:5.973999999999993, fat:0.585, fib:4.469, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:4.4623333333333335, calc:455.3036666666667, zinc:6.034, b12:0, vitD:0, omega3:0, iod:13.665, sel:0, mag:197.43566666666666, pot:278.9796666666667, fol:0},
{id:"taco_105", name:"Catalonia, raw", cat:"Other", cal:23.888412257373297, pro:1.86875, carb:4.75224999999999, fat:0.2823333333333333, fib:2.0483333333333333, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:3.0766666666666667, calc:56.79533333333333, zinc:0.48100000000000004, b12:0, vitD:0, omega3:0, iod:9.393666666666666, sel:0, mag:17.295666666666666, pot:411.7923333333333, fol:0},
{id:"taco_106", name:"Catalonia, sautéed", cat:"Other", cal:63.449269148826616, pro:1.95, carb:4.809333333333338, fat:4.805666666666666, fib:3.65, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:1.1763333333333332, calc:63.22466666666667, zinc:0.4403333333333333, b12:0, vitD:0, omega3:0, iod:24.719333333333335, sel:0, mag:16.345666666666666, pot:452.28133333333335, fol:0},
{id:"taco_107", name:"Raw onion", cat:"Other", cal:39.420046376811584, pro:1.7101449275362322, carb:8.853188405797098, fat:0.08, fib:2.186666666666667, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.20333333333333337, calc:14.0, zinc:0.17333333333333334, b12:0, vitD:0, omega3:0, iod:0.5966666666666667, sel:0, mag:11.91666667, pot:176.11666666666667, fol:0},
{id:"taco_108", name:"Scallions, raw", cat:"Other", cal:19.515885507246438, pro:1.865942028985507, carb:3.370724637681165, fat:0.35, fib:3.55, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.6466666666666666, calc:79.85333333333334, zinc:0.3033333333333333, b12:0, vitD:0, omega3:0, iod:1.6033333333333335, sel:0, mag:24.593333333333334, pot:206.43666666666664, fol:0},
{id:"taco_109", name:"Carrot, cooked", cat:"Other", cal:29.86177771015958, pro:0.8479166666666668, carb:6.686749999999989, fat:0.21833333333333335, fib:2.629, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.09366666666666668, calc:25.617, zinc:0.23199999999999998, b12:0, vitD:0, omega3:0, iod:7.881, sel:0, mag:14.475333333333333, pot:175.509, fol:0},
{id:"taco_110", name:"Raw carrot", cat:"Other", cal:34.13538840579714, pro:1.322463768115942, carb:7.66, fat:0.17333333333333334, fib:3.1833333333333336, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.18333333333333335, calc:22.54, zinc:0.22333333333333336, b12:0, vitD:0, omega3:0, iod:3.3333333333333335, sel:0, mag:11.226666666666667, pot:314.81333333333333, fol:0},
{id:"taco_111", name:"Raw chicory", cat:"Other", cal:13.837120289855097, pro:1.1376811594202898, carb:2.8533333333333437, fat:0.14333333333333334, fib:2.2, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.45333333333333337, calc:44.826666666666675, zinc:0.09033333333333333, b12:0, vitD:0, omega3:0, iod:13.522333333333334, sel:0, mag:14.136666666666665, pot:424.8966666666667, fol:0},
{id:"taco_112", name:"Chayote, cooked", cat:"Other", cal:18.53979053137702, pro:0.41458333333333336, carb:4.7934166666666655, fat:0, fib:1.0396666666666665, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.062, calc:7.827333333333333, zinc:0.09333333333333334, b12:0, vitD:0, omega3:0, iod:1.8073333333333335, sel:0, mag:6.9319999999999995, pot:54.352666666666664, fol:0},
{id:"taco_113", name:"Raw chayote", cat:"Other", cal:16.97891884057972, pro:0.6992753623188407, carb:4.137391304347834, fat:0.06, fib:1.28, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.17, calc:11.506666666666668, zinc:0.10333333333333335, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:7.226666666666667, pot:125.99, fol:0},
{id:"taco_114", name:"Cilantro, dried leaves", cat:"Other", cal:309.0707468044758, pro:20.875, carb:47.955, fat:10.386666666666668, fib:37.29, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:81.43133333333334, calc:783.8136666666666, zinc:4.700666666666667, b12:0, vitD:0, omega3:0, iod:18.255333333333333, sel:0, mag:392.78833333333336, pot:3222.7656666666667, fol:0},
{id:"taco_115", name:"Kale, butter, raw", cat:"Other", cal:27.05669710144928, pro:2.873188405797101, carb:4.333478260869559, fat:0.5466666666666667, fib:3.12, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.45366666666666666, calc:130.86599999999999, zinc:0.39666666666666667, b12:0, vitD:0, omega3:0, iod:6.171, sel:0, mag:34.656666666666666, pot:403.4466666666667, fol:0},
{id:"taco_116", name:"Kale, butter, sautéed", cat:"Other", cal:90.34481542611123, pro:1.6666666666666667, carb:8.707666666666668, fat:6.594, fib:5.7363333333333335, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.49533333333333335, calc:177.33233333333337, zinc:0.19366666666666665, b12:0, vitD:0, omega3:0, iod:11.446666666666667, sel:0, mag:26.204666666666668, pot:314.88899999999995, fol:0},
{id:"taco_117", name:"Raw cauliflower", cat:"Other", cal:22.56334927536229, pro:1.9057971014492752, carb:4.517536231884062, fat:0.21333333333333335, fib:2.35, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.5333333333333333, calc:17.82, zinc:0.3133333333333333, b12:0, vitD:0, omega3:0, iod:3.436666666666666, sel:0, mag:11.993333333333334, pot:256.0133333333333, fol:0},
{id:"taco_118", name:"Cauliflower, cooked", cat:"Other", cal:19.114140614728182, pro:1.2395833333333333, carb:3.8754166666666765, fat:0.26933333333333337, fib:2.130333333333333, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.13033333333333333, calc:16.144333333333332, zinc:0.259, b12:0, vitD:0, omega3:0, iod:1.7876666666666665, sel:0, mag:5.4446666666666665, pot:80.492, fol:0},
{id:"taco_119", name:"Spinach, New Zealand, raw", cat:"Other", cal:16.095694202898525, pro:1.996376811594203, carb:2.5736231884057963, fat:0.24333333333333332, fib:2.1, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.35733333333333334, calc:97.50666666666667, zinc:0.2733333333333334, b12:0, vitD:0, omega3:0, iod:17.094833333333334, sel:0, mag:81.64333333333333, pot:336.00666666666666, fol:0},
{id:"taco_120", name:"Spinach, New Zealand style, stir-fried", cat:"Other", cal:67.25365175066395, pro:2.71875, carb:4.238583333333339, fat:5.434666666666668, fib:2.518333333333333, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.6493333333333334, calc:112.38233333333334, zinc:0.5926666666666667, b12:0, vitD:0, omega3:0, iod:47.02433333333334, sel:0, mag:122.71233333333333, pot:149.22566666666668, fol:0},
{id:"taco_121", name:"Raw cassava flour", cat:"Other", cal:360.8696985507246, pro:1.5543478260869565, carb:87.89898550724637, fat:0.27666666666666667, fib:6.39, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:1.0933333333333335, calc:64.87333333333333, zinc:0.39333333333333337, b12:0, vitD:0, omega3:0, iod:1.0233333333333332, sel:0, mag:37.0, pot:340.13, fol:0},
{id:"taco_122", name:"Toasted cassava flour", cat:"Other", cal:365.268975, pro:1.2291666666666667, carb:89.19416666666666, fat:0.2866666666666667, fib:6.54, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:1.1936666666666664, calc:75.52733333333333, zinc:0.36, b12:0, vitD:0, omega3:0, iod:10.31, sel:0, mag:40.01266666666667, pot:327.735, fol:0},
{id:"taco_123", name:"Flour, from puba", cat:"Other", cal:360.17977487993244, pro:1.6166666666666667, carb:87.28533333333334, fat:0.46900000000000003, fib:4.24, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:1.433, calc:41.39566666666666, zinc:0.337, b12:0, vitD:0, omega3:0, iod:3.607666666666667, sel:0, mag:27.486666666666665, pot:337.76433333333335, fol:0},
{id:"taco_124", name:"Cassava starch", cat:"Other", cal:330.85055833333337, pro:0.5208333333333333, carb:81.14916666666667, fat:0.2833333333333334, fib:0.6466666666666666, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.107, calc:11.889000000000001, zinc:0, b12:0, vitD:0, omega3:0, iod:2.449, sel:0, mag:3.017, pot:48.127, fol:0},
{id:"taco_125", name:"Beans, sprouts, raw", cat:"Other", cal:38.723236375411325, pro:4.166666666666666, carb:7.758333333333329, fat:0.10266666666666667, fib:1.966, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.8203333333333335, calc:14.482666666666667, zinc:0.5713333333333332, b12:0, vitD:0, omega3:0, iod:1.7930000000000001, sel:0, mag:25.126, pot:189.21533333333332, fol:0},
{id:"taco_126", name:"Raw yam", cat:"Other", cal:96.69983188405796, pro:2.0507246376811596, carb:23.23260869565217, fat:0.21333333333333335, fib:1.6533333333333333, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.36, calc:11.796666666666667, zinc:0.3, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:28.763333333333332, pot:567.7433333333333, fol:0},
{id:"taco_127", name:"Raw eggplant", cat:"Other", cal:27.36514347826087, pro:1.4021739130434783, carb:6.191159420289859, fat:0.22, fib:4.826666666666667, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.33666666666666667, calc:19.97, zinc:0.14, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:20.62666666666667, pot:212.95, fol:0},
{id:"taco_128", name:"Jurubeba, raw", cat:"Other", cal:125.81163499999998, pro:4.4125, carb:23.059166666666663, fat:3.9096666666666664, fib:23.921333333333337, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.9460000000000001, calc:151.017, zinc:0.6336666666666667, b12:0, vitD:0, omega3:0, iod:0.7709999999999999, sel:0, mag:65.323, pot:619.3969999999999, fol:0},
{id:"taco_129", name:"Boiled cassava", cat:"Other", cal:125.35825000000003, pro:0.575, carb:30.09, fat:0.29833333333333334, fib:1.5566666666666666, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.07466666666666666, calc:18.628333333333334, zinc:0.1743333333333333, b12:0, vitD:0, omega3:0, iod:0.9066666666666666, sel:0, mag:26.81566666666667, pot:100.36233333333332, fol:0},
{id:"taco_130", name:"Raw cassava", cat:"Other", cal:151.4169565217391, pro:1.1304347826086958, carb:36.16956521739131, fat:0.3, fib:1.8766666666666667, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.27, calc:15.19, zinc:0.20333333333333334, b12:0, vitD:0, omega3:0, iod:2.15, sel:0, mag:44.49666666666667, pot:208.06, fol:0},
{id:"taco_131", name:"Cassava, farofa, seasoned", cat:"Other", cal:405.69394166666666, pro:2.0625, carb:80.30416666666666, fat:9.12, fib:7.816666666666667, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:1.3563333333333334, calc:65.69233333333334, zinc:0.17200000000000001, b12:0, vitD:0, omega3:0, iod:574.5080000000002, sel:0, mag:34.33566666666666, pot:201.37666666666667, fol:0},
{id:"taco_132", name:"Fried cassava", cat:"Other", cal:300.0552433891495, pro:1.38125, carb:50.251416666666664, fat:11.195, fib:1.87, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.32033333333333336, calc:23.05333333333333, zinc:0.437, b12:0, vitD:0, omega3:0, iod:8.936, sel:0, mag:94.86666666666667, pot:176.064, fol:0},
{id:"taco_133", name:"Raw basil", cat:"Other", cal:21.14767681159422, pro:1.985507246376812, carb:3.6444927536231915, fat:0.39333333333333337, fib:3.3066666666666666, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.9733333333333333, calc:210.91666666666666, zinc:0.4633333333333334, b12:0, vitD:0, omega3:0, iod:3.8866666666666667, sel:0, mag:57.81333333333333, pot:251.54666666666665, fol:0},
{id:"taco_134", name:"Raw gherkin", cat:"Other", cal:13.747236086956516, pro:1.391304347826087, carb:2.7286956521739105, fat:0.073, fib:2.193, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.35, calc:20.867, zinc:0.18, b12:0, vitD:0, omega3:0, iod:10.993, sel:0, mag:9.613, pot:327.697, fol:0},
{id:"taco_135", name:"Mustard, leaf, raw", cat:"Other", cal:18.107389052172486, pro:2.110416666666667, carb:3.2365833333333267, fat:0.16766666666666666, fib:1.891, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:1.097, calc:68.17833333333334, zinc:0.284, b12:0, vitD:0, omega3:0, iod:2.8793333333333337, sel:0, mag:15.618333333333332, pot:363.56633333333326, fol:0},
{id:"taco_136", name:"Gnocchi, potato, stew", cat:"Other", cal:180.7752739934126, pro:5.8583333333333325, carb:36.78, fat:1.9433333333333334, fib:1.78, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:1.6496666666666666, calc:11.421333333333331, zinc:0.4803333333333333, b12:0, vitD:0, omega3:0, iod:7.0680000000000005, sel:0, mag:17.898, pot:163.70033333333333, fol:0},
{id:"taco_137", name:"Turnip, raw", cat:"Other", cal:18.18662463768122, pro:1.2028985507246377, carb:4.147101449275376, fat:0.05333333333333334, fib:2.6433333333333335, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.22333333333333336, calc:42.39333333333334, zinc:0.19, b12:0, vitD:0, omega3:0, iod:2.46, sel:0, mag:14.6, pot:279.65333333333336, fol:0},
{id:"taco_138", name:"Hearts of palm, açaí, preserved.", cat:"Other", cal:23.199716434081346, pro:1.7916666666666667, carb:4.328333333333326, fat:0.4033333333333333, fib:3.15, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.3033333333333333, calc:58.288999999999994, zinc:0.7316666666666666, b12:0, vitD:0, omega3:0, iod:513.8203333333332, sel:0, mag:33.702666666666666, pot:243.96933333333334, fol:0},
{id:"taco_139", name:"Hearts of palm, pupunha, preserved", cat:"Other", cal:29.43196333333332, pro:2.4583333333333335, carb:5.508999999999997, fat:0.45, fib:2.55, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.17766666666666667, calc:32.43899999999999, zinc:0.35600000000000004, b12:0, vitD:0, omega3:0, iod:562.6853333333332, sel:0, mag:25.492333333333335, pot:206.41600000000003, fol:0},
{id:"taco_140", name:"Bread, cheese, baked", cat:"Other", cal:363.07791333333336, pro:5.120833333333334, carb:34.2415, fat:24.567333333333334, fib:0.5583333333333332, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.27666666666666667, calc:102.49366666666667, zinc:0.63, b12:0, vitD:0, omega3:0, iod:773.4933333333333, sel:0, mag:8.238999999999999, pot:93.093, fol:0},
{id:"taco_141", name:"Bread, with cheese, raw", cat:"Other", cal:294.538, pro:3.6479999999999997, carb:38.51200000000001, fat:13.988666666666667, fib:0.9763333333333333, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.2876666666666667, calc:87.56366666666668, zinc:0.4266666666666667, b12:0, vitD:0, omega3:0, iod:404.99399999999997, sel:0, mag:6.825666666666667, pot:58.080333333333336, fol:0},
{id:"taco_142", name:"Raw cucumber", cat:"Other", cal:9.533691304347819, pro:0.8695652173913043, carb:2.037101449275353, fat:0, fib:1.12, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.1466666666666667, calc:9.616666666666667, zinc:0.12666666666666668, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:9.34, pot:153.69333333333336, fol:0},
{id:"taco_143", name:"Yellow bell pepper, raw", cat:"Other", cal:27.92745942028985, pro:1.2246376811594204, carb:5.9620289855072475, fat:0.4366666666666667, fib:1.92, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.41333333333333333, calc:9.61, zinc:0.15, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:10.9, pot:221.33333333333334, fol:0},
{id:"taco_144", name:"Green, raw bell pepper", cat:"Other", cal:21.285881159420292, pro:1.0507246376811594, carb:4.892608695652178, fat:0.15, fib:2.563333333333333, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.41, calc:8.763333333333334, zinc:0.14, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:7.79, pot:174.33, fol:0},
{id:"taco_145", name:"Red bell pepper, raw", cat:"Other", cal:23.28136376811601, pro:1.039855072463768, carb:5.466811594202911, fat:0.1466666666666667, fib:1.5933333333333335, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.3333333333333333, calc:6.37, zinc:0.15333333333333332, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:11.13, pot:210.91666666666666, fol:0},
{id:"taco_146", name:"Tapioca starch, sweet", cat:"Other", cal:351.2267333333333, pro:0.43, carb:86.77333333333333, fat:0, fib:0.23666666666666666, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.51, calc:27.413333333333338, zinc:0, b12:0, vitD:0, omega3:0, iod:1.5766666666666669, sel:0, mag:4.1, pot:37.63333333333333, fol:0},
{id:"taco_147", name:"Raw okra", cat:"Other", cal:29.939262150069077, pro:1.91875, carb:6.373916666666666, fat:0.299, fib:4.553333333333334, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.369, calc:112.15966666666667, zinc:0.5890000000000001, b12:0, vitD:0, omega3:0, iod:0.891, sel:0, mag:49.969, pot:248.80433333333335, fol:0},
{id:"taco_148", name:"Radish, raw", cat:"Other", cal:13.738126086956488, pro:1.391304347826087, carb:2.7253623188405807, fat:0.07333333333333335, fib:2.1933333333333334, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.35, calc:20.866666666666667, zinc:0.18, b12:0, vitD:0, omega3:0, iod:10.993333333333334, sel:0, mag:9.613333333333332, pot:327.6966666666667, fol:0},
{id:"taco_149", name:"Raw white cabbage", cat:"Other", cal:17.11880289855071, pro:0.8768115942028986, carb:3.8598550724637692, fat:0.14333333333333334, fib:1.89, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.15, calc:34.546666666666674, zinc:0.15, b12:0, vitD:0, omega3:0, iod:3.643333333333333, sel:0, mag:8.513333333333334, pot:150.09, fol:0},
{id:"taco_150", name:"Raw purple cabbage", cat:"Other", cal:30.907502954324087, pro:1.908333333333333, carb:7.204000000000001, fat:0.06366666666666666, fib:1.9733333333333334, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.5163333333333334, calc:43.67033333333334, zinc:0.25466666666666665, b12:0, vitD:0, omega3:0, iod:2.337666666666667, sel:0, mag:18.024333333333335, pot:328.0686666666667, fol:0},
{id:"taco_151", name:"Cabbage, purple, sautéed", cat:"Other", cal:41.77352528971434, pro:1.8020833333333333, carb:7.561583333333334, fat:1.2403333333333333, fib:1.75, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.4663333333333333, calc:42.588, zinc:0.25633333333333336, b12:0, vitD:0, omega3:0, iod:3.4166666666666665, sel:0, mag:17.248, pot:321.45300000000003, fol:0},
{id:"taco_152", name:"Raw arugula", cat:"Other", cal:13.133256607294062, pro:1.7666666666666664, carb:2.2196666666666607, fat:0.10733333333333334, fib:1.74, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.9390000000000001, calc:116.56333333333333, zinc:0.22866666666666668, b12:0, vitD:0, omega3:0, iod:9.418, sel:0, mag:17.790666666666667, pot:233.40033333333335, fol:0},
{id:"taco_153", name:"Salsa, hard", cat:"Other", cal:33.424111594202884, pro:3.2572463768115942, carb:5.706086956521735, fat:0.61, fib:1.85, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:3.18, calc:179.41333333333333, zinc:1.3233333333333333, b12:0, vitD:0, omega3:0, iod:2.3, sel:0, mag:20.896666667, pot:711.2966666666666, fol:0},
{id:"taco_154", name:"Canned mixed vegetables", cat:"Other", cal:56.533772463768145, pro:3.4202898550724634, carb:12.669710144927544, fat:0.35333333333333333, fib:3.09, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:1.06, calc:16.156666666666666, zinc:0.5266666666666667, b12:0, vitD:0, omega3:0, iod:398.1366666666666, sel:0, mag:15.613333333333335, pot:122.21333333333332, fol:0},
{id:"taco_155", name:"Raw sow thistle", cat:"Other", cal:30.397934166666644, pro:2.6729166666666666, carb:4.946749999999999, fat:0.7426666666666666, fib:3.5185000000000004, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:1.2693333333333332, calc:126.02366666666667, zinc:1.3316666666666668, b12:0, vitD:0, omega3:0, iod:19.346999999999998, sel:0, mag:29.551666666666666, pot:265.2663333333333, fol:0},
{id:"taco_156", name:"Raw taro leaves", cat:"Other", cal:34.208918333333315, pro:2.8958333333333335, carb:5.430499999999991, fat:0.9266666666666667, fib:4.453666666666667, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:1.9066666666666665, calc:141.08700000000002, zinc:0.6063333333333333, b12:0, vitD:0, omega3:0, iod:1.1606666666666667, sel:0, mag:37.922666666666665, pot:290.3196666666667, fol:0},
{id:"taco_157", name:"Tomato, with seeds, raw", cat:"Other", cal:15.335156521739158, pro:1.0978260869565217, carb:3.138840579710146, fat:0.17333333333333334, fib:1.1733333333333331, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.23666666666666666, calc:6.94, zinc:0.1366666666666667, b12:0, vitD:0, omega3:0, iod:1.02, sel:0, mag:10.54, pot:222.38666666666666, fol:0},
{id:"taco_158", name:"Tomato extract", cat:"Other", cal:60.93343365217388, pro:2.4347826086956523, carb:14.95861739130434, fat:0.19, fib:2.80333, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:2.0933333333333333, calc:29.0766, zinc:0.3666666666666667, b12:0, vitD:0, omega3:0, iod:497.93333333333334, sel:0, mag:29.3266, pot:679.91, fol:0},
{id:"taco_159", name:"Tomato, processed sauce", cat:"Other", cal:38.446549460490566, pro:1.375, carb:7.711666666666678, fat:0.9033333333333333, fib:3.1166666666666667, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:1.577333333333333, calc:11.729333333333335, zinc:0.129, b12:0, vitD:0, omega3:0, iod:418.2806666666667, sel:0, mag:16.789333333333335, pot:388.195, fol:0},
{id:"taco_160", name:"Tomato, puree", cat:"Other", cal:27.93687971014494, pro:1.36231884057971, carb:6.894347826086953, fat:0, fib:1.0266666666666666, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:1.25, calc:13.243333333333334, zinc:0.3333333333333333, b12:0, vitD:0, omega3:0, iod:103.93, sel:0, mag:15.436666666666667, pot:308.24333333333334, fol:0},
{id:"taco_161", name:"Tomato salad", cat:"Other", cal:20.546909166666637, pro:0.8104166666666668, carb:5.117916666666662, fat:0, fib:2.268333333333333, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.29033333333333333, calc:6.946333333333334, zinc:0.17300000000000001, b12:0, vitD:0, omega3:0, iod:5.243, sel:0, mag:9.503666666666668, pot:161.155, fol:0},
{id:"taco_162", name:"Green bean, raw", cat:"Other", cal:24.898357971014487, pro:1.786231884057971, carb:5.347101449275358, fat:0.17333333333333334, fib:2.3833333333333333, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.43, calc:41.1, zinc:0.33, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:17.833333333333332, pot:208.20333333333335, fol:0},
{id:"taco_163", name:"Raw avocado", cat:"Other", cal:96.1547086956522, pro:1.2391304347826086, carb:6.0308695652173965, fat:8.396666666666667, fib:6.313333333333333, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.20666666666666667, calc:7.916666666666667, zinc:0.21666666666666667, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:14.683333333333332, pot:206.25666666666666, fol:0},
{id:"taco_164", name:"Raw pineapple", cat:"Other", cal:48.32221304347824, pro:0.8586956521739131, carb:12.33463768115941, fat:0.12333333333333334, fib:0.9866666666666667, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.25666666666666665, calc:22.433333333333334, zinc:0.14333333333333334, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:18.44, pot:131.34, fol:0},
{id:"taco_165", name:"Pineapple pulp, frozen", cat:"Other", cal:30.591799194335923, pro:0.4666666666666666, carb:7.798666666666662, fat:0.11333333333333333, fib:0.32666666666666666, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.35733333333333334, calc:13.538000000000002, zinc:0.06033333333333333, b12:0, vitD:0, omega3:0, iod:1.2363333333333333, sel:0, mag:10.071333333333333, pot:106.68433333333333, fol:0},
{id:"taco_166", name:"I'm sorry, I'm sorry.", cat:"Other", cal:62.42409840854006, pro:0.8333333333333334, carb:14.926999999999998, fat:0.7033333333333333, fib:1.696, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.15866666666666665, calc:5.78, zinc:0.09866666666666668, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:9.296333333333335, pot:128.33900000000003, fol:0},
{id:"taco_167", name:"Acai pulp with guarana syrup and glucose.", cat:"Other", cal:110.29759000000001, pro:0.7208333333333334, carb:21.45516666666667, fat:3.6603333333333334, fib:1.7233333333333334, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.26833333333333337, calc:22.159000000000002, zinc:0.19400000000000003, b12:0, vitD:0, omega3:0, iod:15.098666666666666, sel:0, mag:12.726333333333335, pot:75.49433333333333, fol:0},
{id:"taco_168", name:"Açaí pulp, frozen", cat:"Other", cal:58.04536887282133, pro:0.7979166666666667, carb:6.2084166666666665, fat:3.9443333333333332, fib:2.5533333333333332, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.4323333333333333, calc:35.18, zinc:0.26533333333333337, b12:0, vitD:0, omega3:0, iod:5.177, sel:0, mag:17.04, pot:123.61666666666667, fol:0},
{id:"taco_169", name:"Raw acerola", cat:"Other", cal:33.46227000000003, pro:0.90625, carb:7.966416666666672, fat:0.20766666666666667, fib:1.5113333333333332, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.22199999999999998, calc:12.552333333333332, zinc:0.14533333333333331, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:13.133333333333335, pot:164.98866666666666, fol:0},
{id:"taco_170", name:"Acerola pulp, frozen", cat:"Other", cal:21.936799999999977, pro:0.5916666666666668, carb:5.541333333333331, fat:0, fib:0.7033333333333333, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.16733333333333333, calc:7.593333333333334, zinc:0.07266666666666666, b12:0, vitD:0, omega3:0, iod:1.28, sel:0, mag:8.658, pot:111.98566666666666, fol:0},
{id:"taco_171", name:"Plum, syrup, canned", cat:"Other", cal:182.84662000000003, pro:0.4083333333333334, carb:46.89266666666667, fat:0, fib:0.517, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:2.1533333333333338, calc:13.151000000000002, zinc:0.13633333333333333, b12:0, vitD:0, omega3:0, iod:2.704333333333333, sel:0, mag:9.964333333333334, pot:221.19299999999998, fol:0},
{id:"taco_172", name:"Raw plum", cat:"Other", cal:52.54248260869565, pro:0.7717391304347826, carb:13.851594202898553, fat:0, fib:2.433333333333333, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.10333333333333333, calc:5.72, zinc:0.05, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:5.476666666666667, pot:134.0533333333333, fol:0},
{id:"taco_173", name:"Plums in syrup, canned, drained", cat:"Other", cal:177.35918531537055, pro:1.025, carb:47.658, fat:0.2803333333333333, fib:4.546666666666667, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:2.6976666666666667, calc:39.237, zinc:0.20133333333333334, b12:0, vitD:0, omega3:0, iod:2.7903333333333333, sel:0, mag:14.491, pot:263.2613333333333, fol:0},
{id:"taco_174", name:"Raw atemoya", cat:"Other", cal:96.97158744792144, pro:0.9708333333333332, carb:25.332166666666662, fat:0.30033333333333334, fib:2.1353333333333335, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.16416666666666666, calc:22.766000000000002, zinc:0.18766666666666665, b12:0, vitD:0, omega3:0, iod:0.785, sel:0, mag:24.835333333333335, pot:300.0126666666667, fol:0},
{id:"taco_175", name:"Banana, from the ground, raw", cat:"Other", cal:128.02445217391306, pro:1.4347826086956523, carb:33.66521739130435, fat:0.24, fib:1.5266666666666666, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.29333333333333333, calc:4.151, zinc:0.16, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:23.786666666666665, pot:328.03, fol:0},
{id:"taco_176", name:"Banana, sweet bar", cat:"Other", cal:280.10519255063934, pro:2.16875, carb:75.66658333333334, fat:0.05, fib:3.8333333333333335, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.613, calc:11.950333333333333, zinc:0.302, b12:0, vitD:0, omega3:0, iod:9.882333333333333, sel:0, mag:49.193999999999996, pot:518.25, fol:0},
{id:"taco_177", name:"Banana, fig, raw", cat:"Other", cal:105.08265000000002, pro:1.13125, carb:27.80441666666667, fat:0.1416666666666667, fib:2.8, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.19800000000000004, calc:6.356333333333333, zinc:0.12266666666666666, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:30.16133333333333, pot:386.5916666666667, fol:0},
{id:"taco_178", name:"Banana, apple, raw", cat:"Other", cal:86.80533043478259, pro:1.7536231884057971, carb:22.3363768115942, fat:0.06, fib:2.5933333333333333, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.20333333333333337, calc:3.22, zinc:0.12, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:23.686666666666667, pot:264.3866666666667, fol:0},
{id:"taco_179", name:"Banana, dwarf variety, raw", cat:"Other", cal:91.52884782608696, pro:1.3985507246376814, carb:23.848115942028986, fat:0.11666666666666665, fib:1.9466666666666665, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.3466666666666667, calc:3.4166666666666665, zinc:0.17666666666666667, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:27.796666666666663, pot:376.47, fol:0},
{id:"taco_180", name:"Banana, gold, raw", cat:"Other", cal:112.36604782608694, pro:1.4818840579710144, carb:29.341449275362308, fat:0.21, fib:1.9533333333333331, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.33666666666666667, calc:3.186666666666666, zinc:0.25666666666666665, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:28.383333333333336, pot:354.81, fol:0},
{id:"taco_181", name:"Banana, rat, cruza", cat:"Other", cal:77.90952792507412, pro:1.2270833333333333, carb:20.312583333333333, fat:0.079, fib:2.0303333333333335, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.3746666666666667, calc:5.490333333333333, zinc:0.13533333333333333, b12:0, vitD:0, omega3:0, iod:0.9386666666666666, sel:0, mag:30.412333333333336, pot:267.35, fol:0},
{id:"taco_182", name:"Banana, silver, raw", cat:"Other", cal:98.24970217391306, pro:1.2681159420289856, carb:25.956884057971017, fat:0.065, fib:2.0433333333333334, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.38, calc:7.5633333333333335, zinc:0.1466666666666667, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:26.29, pot:357.6766666666667, fol:0},
{id:"taco_183", name:"Raw cacao", cat:"Other", cal:74.29148000000004, pro:0.9541666666666665, carb:19.411166666666677, fat:0.144, fib:2.189, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.25833333333333336, calc:12.104666666666667, zinc:0.5876666666666667, b12:0, vitD:0, omega3:0, iod:0.7003333333333334, sel:0, mag:24.616333333333333, pot:71.644, fol:0},
{id:"taco_184", name:"Raw Cajá-Manga", cat:"Other", cal:45.58096877372266, pro:1.2791666666666666, carb:11.434166666666664, fat:0, fib:2.5753333333333335, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.15433333333333332, calc:12.744, zinc:0.18099999999999997, b12:0, vitD:0, omega3:0, iod:1.4386666666666665, sel:0, mag:11.283999999999999, pot:119.399, fol:0},
{id:"taco_185", name:"Cajá fruit pulp, frozen", cat:"Other", cal:26.332269311050553, pro:0.5895833333333333, carb:6.374416666666661, fat:0.16766666666666666, fib:1.36, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.32233333333333336, calc:9.160666666666666, zinc:0.054, b12:0, vitD:0, omega3:0, iod:6.945, sel:0, mag:7.171333333333333, pot:148.075, fol:0},
{id:"taco_186", name:"Cashew, raw", cat:"Other", cal:43.065068521739114, pro:0.9710144927536233, carb:10.288988840579705, fat:0.33, fib:1.68, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.15333333333333335, calc:1.4166666666666667, zinc:0.09, b12:0, vitD:0, omega3:0, iod:2.966666666666667, sel:0, mag:10.11, pot:123.86, fol:0},
{id:"taco_187", name:"Cashew pulp, frozen", cat:"Other", cal:36.568679999999965, pro:0.48125, carb:9.350749999999994, fat:0.154, fib:0.8146666666666667, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.14666666666666664, calc:0.8393333333333334, zinc:0.08366666666666667, b12:0, vitD:0, omega3:0, iod:4.161666666666666, sel:0, mag:7.071666666666666, pot:87.66333333333334, fol:0},
{id:"taco_188", name:"Cashew juice, concentrated, bottled", cat:"Other", cal:45.10862666666668, pro:0.4041666666666667, carb:10.733833333333331, fat:0.2, fib:0.626, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.146, calc:0.9756666666666667, zinc:0.065, b12:0, vitD:0, omega3:0, iod:45.044333333333334, sel:0, mag:8.447000000000001, pot:106.98700000000001, fol:0},
{id:"taco_189", name:"Persimmon, chocolate, raw", cat:"Other", cal:71.35001811164616, pro:0.35625, carb:19.325749999999996, fat:0.06933333333333334, fib:6.517666666666667, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.09900000000000002, calc:17.848333333333333, zinc:0.18699999999999997, b12:0, vitD:0, omega3:0, iod:2.1833333333333336, sel:0, mag:8.547333333333334, pot:163.5463333333333, fol:0},
{id:"taco_190", name:"Star fruit, raw", cat:"Other", cal:45.740888793428724, pro:0.8708333333333333, carb:11.481499999999997, fat:0.17699999999999996, fib:2.0313333333333334, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.19833333333333333, calc:4.788333333333333, zinc:0.24, b12:0, vitD:0, omega3:0, iod:4.094666666666666, sel:0, mag:7.361, pot:132.57633333333334, fol:0},
{id:"taco_191", name:"Ciriguela, crua", cat:"Other", cal:75.59411, pro:1.3979166666666667, carb:18.857416666666666, fat:0.35966666666666663, fib:3.9019999999999997, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.35733333333333334, calc:27.414, zinc:0.5313333333333333, b12:0, vitD:0, omega3:0, iod:1.6823333333333335, sel:0, mag:17.963333333333335, pot:248.01466666666667, fol:0},
{id:"taco_192", name:"Cupuaçu, raw", cat:"Other", cal:49.42255877437193, pro:1.1604166666666664, carb:10.433583333333335, fat:0.9513333333333334, fib:3.1159999999999997, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.48566666666666664, calc:13.120333333333335, zinc:0.33666666666666667, b12:0, vitD:0, omega3:0, iod:3.196, sel:0, mag:18.171333333333333, pot:331.03333333333336, fol:0},
{id:"taco_193", name:"Cupuaçu pulp, frozen", cat:"Other", cal:48.79688999999999, pro:0.84375, carb:11.386916666666668, fat:0.5936666666666667, fib:1.591, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.259, calc:5.490666666666667, zinc:0.151, b12:0, vitD:0, omega3:0, iod:0.6890000000000001, sel:0, mag:13.911333333333333, pot:291.09233333333333, fol:0},
{id:"taco_194", name:"Raw fig", cat:"Other", cal:41.447126086956516, pro:0.967391304347826, carb:10.245942028985507, fat:0.15666666666666665, fib:1.7933333333333332, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.20333333333333334, calc:27.39, zinc:0.09, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:11.31, pot:174.42, fol:0},
{id:"taco_195", name:"Canned figs in syrup", cat:"Other", cal:184.36071739130435, pro:0.5615942028985508, carb:50.33840579710145, fat:0.15, fib:1.9766666666666666, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.5033333333333333, calc:32.61666666666667, zinc:0.09, b12:0, vitD:0, omega3:0, iod:6.87, sel:0, mag:6.85, pot:39.35, fol:0},
{id:"taco_196", name:"Raw breadfruit", cat:"Other", cal:67.04561999999997, pro:1.08125, carb:17.17441666666665, fat:0.18933333333333335, fib:5.545333333333333, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.2306666666666667, calc:33.67566666666667, zinc:0.126, b12:0, vitD:0, omega3:0, iod:0.7993333333333333, sel:0, mag:24.032999999999998, pot:188.12633333333335, fol:0},
{id:"taco_197", name:"Guava, white, with peel, raw", cat:"Other", cal:51.73774782608695, pro:0.8985507246376812, carb:12.401449275362321, fat:0.48666666666666664, fib:6.33, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.17, calc:5.007333333333333, zinc:0.15666666666666668, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:7.043333333333334, pot:219.77, fol:0},
{id:"taco_198", name:"Guava, sweet paste", cat:"Other", cal:268.9598260869565, pro:0.5797101449275363, carb:74.1236231884058, fat:0.0, fib:3.733333333333334, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.4, calc:10.06, zinc:0.09, b12:0, vitD:0, omega3:0, iod:3.7, sel:0, mag:6.486666666666667, pot:164.80666666666667, fol:0},
{id:"taco_199", name:"Guava, sweet, with a thick rind", cat:"Other", cal:285.58779243900375, pro:0.41458333333333336, carb:78.70275, fat:0.10333333333333333, fib:4.366666666666667, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.4023333333333334, calc:14.699, zinc:0.14, b12:0, vitD:0, omega3:0, iod:11.029333333333334, sel:0, mag:9.668333333333335, pot:250.72333333333336, fol:0},
{id:"taco_200", name:"Guava, red, with peel, raw", cat:"Other", cal:54.16993043478262, pro:1.0869565217391304, carb:13.009710144927533, fat:0.44, fib:6.223333333333334, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.17, calc:4.451333333333333, zinc:0.13, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:6.8933333333333335, pot:197.58, fol:0},
{id:"taco_201", name:"Raw soursop", cat:"Other", cal:61.62189837666358, pro:0.8458333333333333, carb:15.839500000000008, fat:0.21, fib:1.909, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.16966666666666666, calc:40.118, zinc:0.126, b12:0, vitD:0, omega3:0, iod:4.16, sel:0, mag:23.49933333333333, pot:249.66566666666665, fol:0},
{id:"taco_202", name:"Soursop pulp, frozen", cat:"Other", cal:38.27386999999997, pro:0.5666666666666667, carb:9.782666666666657, fat:0.1376666666666667, fib:1.1876666666666666, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.10266666666666667, calc:5.978666666666666, zinc:0.05366666666666667, b12:0, vitD:0, omega3:0, iod:3.046333333333333, sel:0, mag:9.76, pot:169.95666666666668, fol:0},
{id:"taco_203", name:"Raw jabuticaba", cat:"Other", cal:58.05315000000004, pro:0.6125, carb:15.255833333333337, fat:0.12833333333333333, fib:2.299, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.09466666666666668, calc:8.347999999999999, zinc:0.28333333333333327, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:17.779666666666667, pot:129.72433333333333, fol:0},
{id:"taco_204", name:"Raw jackfruit", cat:"Other", cal:87.92034999999997, pro:1.4020833333333336, carb:22.497583333333324, fat:0.265, fib:2.3859999999999997, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.38266666666666665, calc:11.245, zinc:0.16666666666666666, b12:0, vitD:0, omega3:0, iod:1.8016666666666667, sel:0, mag:40.05233333333333, pot:233.75233333333335, fol:0},
{id:"taco_205", name:"Hello, crew.", cat:"Other", cal:26.91229999999998, pro:0.8854166666666669, carb:6.494250000000001, fat:0.06666666666666667, fib:5.074333333333333, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.1366666666666667, calc:13.8, zinc:0.11399999999999999, b12:0, vitD:0, omega3:0, iod:21.656000000000002, sel:0, mag:14.178333333333335, pot:134.869, fol:0},
{id:"taco_206", name:"Raw jambolan", cat:"Other", cal:41.00970891670385, pro:0.5458333333333333, carb:10.627166666666664, fat:0.10966666666666665, fib:1.7766666666666666, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.04766666666666667, calc:3.09, zinc:0.04900000000000001, b12:0, vitD:0, omega3:0, iod:1.3663333333333334, sel:0, mag:2.1646666666666667, pot:394.3433333333333, fol:0},
{id:"taco_207", name:"Raw kiwi", cat:"Other", cal:51.136330434782636, pro:1.3369565217391304, carb:11.499710144927537, fat:0.6266666666666666, fib:2.653333333333333, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.25333333333333335, calc:23.913333333333338, zinc:0.07, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:10.576666666666666, pot:268.92333333333335, fol:0},
{id:"taco_208", name:"Orange, bay, raw", cat:"Other", cal:45.43811739130433, pro:0.9782608695652175, carb:11.468405797101452, fat:0.10333333333333335, fib:1.1233333333333333, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.1366666666666667, calc:35.407000000000004, zinc:0.06, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:9.216666666666667, pot:174.14666666666668, fol:0},
{id:"taco_209", name:"Orange, bay, juice", cat:"Other", cal:36.64948260869561, pro:0.6521739130434783, carb:8.69782608695652, fat:0, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.06333333333333334, calc:5.926666666666667, zinc:0, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:7.8, pot:172.56, fol:0},
{id:"taco_210", name:"Orange, from the land, raw", cat:"Other", cal:51.471128639280764, pro:1.0770833333333334, carb:12.860583333333317, fat:0.18566666666666665, fib:3.9770000000000003, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.14666666666666664, calc:51.08233333333334, zinc:0.21833333333333335, b12:0, vitD:0, omega3:0, iod:0.83, sel:0, mag:14.056666666666667, pot:172.52, fol:0},
{id:"taco_211", name:"Orange, from the land, juice", cat:"Other", cal:40.95600731086733, pro:0.6666666666666667, carb:9.573333333333336, fat:0.14200000000000002, fib:1.031, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.08600000000000001, calc:13.388333333333334, zinc:0.07366666666666667, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:10.109333333333334, pot:145.24133333333336, fol:0},
{id:"taco_212", name:"Orange, lime, raw", cat:"Other", cal:45.701038780629624, pro:1.05625, carb:11.53375, fat:0.07533333333333332, fib:1.782, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.12, calc:31.46666666666667, zinc:0.117, b12:0, vitD:0, omega3:0, iod:1.111, sel:0, mag:10.157666666666666, pot:129.87, fol:0},
{id:"taco_213", name:"Orange, lime, juice", cat:"Other", cal:39.336093944132394, pro:0.7145833333333333, carb:9.16741666666668, fat:0.11933333333333333, fib:0.424, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0, calc:7.7363333333333335, zinc:0.029333333333333333, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:10.892666666666665, pot:128.7446666666667, fol:0},
{id:"taco_214", name:"Orange, pear, raw", cat:"Other", cal:36.77376521739132, pro:1.0434782608695652, carb:8.946521739130437, fat:0.12666666666666668, fib:0.7666666666666666, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.09, calc:21.886, zinc:0.06, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:8.613333333333333, pot:162.82, fol:0},
{id:"taco_215", name:"Orange, pear, juice", cat:"Other", cal:32.70975362318838, pro:0.7391304347826088, carb:7.554202898550721, fat:0.07333333333333333, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0, calc:7.366666666666666, zinc:0, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:7.586666666666666, pot:148.75666666666666, fol:0},
{id:"taco_216", name:"Orange, Valencia, raw", cat:"Other", cal:46.109628783385006, pro:0.7666666666666666, carb:11.723000000000013, fat:0.159, fib:1.7276666666666667, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.09100000000000001, calc:33.736, zinc:0.112, b12:0, vitD:0, omega3:0, iod:0.629, sel:0, mag:14.402666666666667, pot:157.90333333333334, fol:0},
{id:"taco_217", name:"Orange, Valencia, juice", cat:"Other", cal:36.19635058768591, pro:0.4833333333333333, carb:8.554000000000004, fat:0.12433333333333334, fib:0.422, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0, calc:9.076333333333332, zinc:0, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:9.592666666666668, pot:143.418, fol:0},
{id:"taco_218", name:"Lemon, cloves, juice", cat:"Other", cal:14.103733399311682, pro:0.325, carb:5.246666666666659, fat:0, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.079, calc:10.183666666666666, zinc:0, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:8.857666666666665, pot:119.87933333333335, fol:0},
{id:"taco_219", name:"Lemon, Galician, juice", cat:"Other", cal:22.22504347826089, pro:0.5652173913043479, carb:7.321449275362319, fat:0.06666666666666667, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.05333333333333334, calc:5.263333333333334, zinc:0.05333333333333334, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:5.92, pot:112.51, fol:0},
{id:"taco_220", name:"Raw Tahiti lime", cat:"Other", cal:31.818153430163903, pro:0.9395833333333332, carb:11.084416666666677, fat:0.14, fib:1.1816666666666666, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.179666666666667, calc:50.983666666666664, zinc:0.211, b12:0, vitD:0, omega3:0, iod:1.2483333333333333, sel:0, mag:9.696, pot:128.29333333333332, fol:0},
{id:"taco_221", name:"Apple, Argentina, with peel, raw.", cat:"Other", cal:62.531818366289116, pro:0.225, carb:16.587999999999997, fat:0.246, fib:2.026333333333333, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.05333333333333334, calc:3.392333333333333, zinc:0, b12:0, vitD:0, omega3:0, iod:1.318, sel:0, mag:4.857666666666666, pot:117.47699999999999, fol:0},
{id:"taco_222", name:"Raw Fuji apple, with peel.", cat:"Other", cal:55.51520000000005, pro:0.2866666666666667, carb:15.153333333333341, fat:0, fib:1.3466666666666667, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.09333333333333334, calc:1.9233333333333331, zinc:0, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:2.04, pot:74.71333333333332, fol:0},
{id:"taco_223", name:"Raw macaúba", cat:"Other", cal:404.2818766666667, pro:2.0828999999999995, carb:13.945433333333337, fat:40.656666666666666, fib:13.4435, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.8080000000000002, calc:66.53233333333334, zinc:0.6643333333333333, b12:0, vitD:0, omega3:0, iod:0.6543333333333333, sel:0, mag:66.05333333333333, pot:305.81300000000005, fol:0},
{id:"taco_224", name:"Papaya, sweet in syrup, drained", cat:"Other", cal:195.62747482178608, pro:0.19375, carb:54.00358333333333, fat:0.06733333333333334, fib:1.3133333333333332, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.10766666666666667, calc:20.012666666666664, zinc:0.06566666666666666, b12:0, vitD:0, omega3:0, iod:2.9143333333333334, sel:0, mag:5.814333333333334, pot:68.23566666666666, fol:0},
{id:"taco_225", name:"Papaya, Formosa variety, raw.", cat:"Other", cal:45.34074782608691, pro:0.8152173913043478, carb:11.554782608695643, fat:0.12, fib:1.8133333333333335, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.2333333333333333, calc:24.873333333333335, zinc:0.07, b12:0, vitD:0, omega3:0, iod:3.2566666666666664, sel:0, mag:17.323333333333334, pot:221.8033333333333, fol:0},
{id:"taco_226", name:"Raw papaya", cat:"Other", cal:40.156768942296566, pro:0.45625, carb:10.439750000000016, fat:0.12433333333333334, fib:1.0426666666666666, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.19333333333333336, calc:22.418333333333337, zinc:0.07100000000000001, b12:0, vitD:0, omega3:0, iod:1.6303333333333334, sel:0, mag:22.176, pot:126.14666666666669, fol:0},
{id:"taco_227", name:"Green papaya, sweet in syrup, drained", cat:"Other", cal:209.3762544589043, pro:0.31666666666666665, carb:57.63666666666667, fat:0.09800000000000002, fib:1.2333333333333332, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.154, calc:12.435, zinc:0.021, b12:0, vitD:0, omega3:0, iod:4.74, sel:0, mag:4.542666666666666, pot:8.670333333333334, fol:0},
{id:"taco_228", name:"Manga, Haden, Crua", cat:"Other", cal:63.50031833879153, pro:0.4083333333333334, carb:16.662666666666667, fat:0.256, fib:1.582, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.09600000000000002, calc:11.659666666666666, zinc:0.06633333333333334, b12:0, vitD:0, omega3:0, iod:0.5513333333333333, sel:0, mag:7.815333333333334, pot:147.88333333333333, fol:0},
{id:"taco_229", name:"Manga, Palmer, Crua", cat:"Other", cal:72.48673809168733, pro:0.41041666666666665, carb:19.35224999999999, fat:0.17200000000000001, fib:1.6333333333333335, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.09133333333333332, calc:11.638333333333334, zinc:0.08700000000000001, b12:0, vitD:0, omega3:0, iod:1.8636666666666668, sel:0, mag:8.725, pot:156.53, fol:0},
{id:"taco_230", name:"Mango, pulp, frozen", cat:"Other", cal:48.30588, pro:0.38125, carb:12.518416666666665, fat:0.23399999999999999, fib:1.07, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.08933333333333333, calc:7.1209999999999996, zinc:0.065, b12:0, vitD:0, omega3:0, iod:6.733333333333333, sel:0, mag:9.494000000000002, pot:131.37433333333334, fol:0},
{id:"taco_231", name:"Manga, Tommy Atkins, Crua", cat:"Other", cal:50.69218260869563, pro:0.8550724637681161, carb:12.771594202898537, fat:0.22, fib:2.0666666666666664, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.08, calc:7.636666666666667, zinc:0.08, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:7.396666666666667, pot:138.36666666666665, fol:0},
{id:"taco_232", name:"Passion fruit, raw", cat:"Other", cal:68.43950869565214, pro:1.9891304347826089, carb:12.264202898550717, fat:2.103333333333333, fib:1.1366666666666667, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.56, calc:5.3933333333333335, zinc:0.39333333333333337, b12:0, vitD:0, omega3:0, iod:1.58, sel:0, mag:27.96666666666667, pot:338.42, fol:0},
{id:"taco_233", name:"Passion fruit pulp, frozen", cat:"Other", cal:38.75969999999999, pro:0.8125, carb:9.597499999999993, fat:0.17666666666666667, fib:0.5059999999999999, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.29233333333333333, calc:4.609666666666667, zinc:0.18800000000000003, b12:0, vitD:0, omega3:0, iod:8.096, sel:0, mag:9.701, pot:227.90966666666668, fol:0},
{id:"taco_234", name:"Passion fruit, concentrated juice, bottled.", cat:"Other", cal:41.96731999999999, pro:0.7666666666666666, carb:9.635999999999992, fat:0.19333333333333336, fib:0.35366666666666663, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.345, calc:4.158333333333334, zinc:0.136, b12:0, vitD:0, omega3:0, iod:21.692333333333334, sel:0, mag:4.158333333333334, pot:200.69533333333334, fol:0},
{id:"taco_235", name:"Watermelon, raw", cat:"Other", cal:32.60662608695646, pro:0.8840579710144928, carb:8.139275362318838, fat:0, fib:0.12333333333333334, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.22666666666666666, calc:7.72, zinc:0.09666666666666668, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:9.63, pot:104.02666666666669, fol:0},
{id:"taco_236", name:"Raw melon", cat:"Other", cal:29.369391304347808, pro:0.6775362318840581, carb:7.525797101449274, fat:0, fib:0.25, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.23, calc:2.856666666666667, zinc:0.09, b12:0, vitD:0, omega3:0, iod:11.166666666666666, sel:0, mag:5.95, pot:216.0, fol:0},
{id:"taco_237", name:"Tangerine, Murcote, raw", cat:"Other", cal:57.592778474648775, pro:0.8833333333333334, carb:14.861999999999998, fat:0.134, fib:3.073333333333333, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.06933333333333334, calc:33.07, zinc:0.102, b12:0, vitD:0, omega3:0, iod:1.1673333333333333, sel:0, mag:12.303666666666667, pot:158.53833333333333, fol:0},
{id:"taco_238", name:"Tangerine, Rio, raw", cat:"Other", cal:36.871350000000064, pro:0.65, carb:9.337000000000014, fat:0.12833333333333333, fib:2.731666666666667, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.08933333333333333, calc:17.183666666666667, zinc:0.15466666666666665, b12:0, vitD:0, omega3:0, iod:1.8239999999999998, sel:0, mag:8.212, pot:124.98666666666668, fol:0},
{id:"taco_239", name:"Raw strawberries", cat:"Other", cal:30.147917391304354, pro:0.8949275362318839, carb:6.818405797101459, fat:0.31, fib:1.7233333333333334, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.32, calc:10.9, zinc:0.17666666666666667, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:9.673333333333334, pot:184.39666666666668, fol:0},
{id:"taco_240", name:"Loquat, hard", cat:"Other", cal:42.539198868195214, pro:0.30833333333333335, carb:11.528666666666659, fat:0, fib:2.958, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.14666666666666667, calc:19.686666666666667, zinc:0.12133333333333333, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:9.720666666666666, pot:112.85, fol:0},
{id:"taco_241", name:"Pequi, raw", cat:"Other", cal:204.96677, pro:2.3354166666666667, carb:12.972916666666666, fat:17.971, fib:19.041, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.27366666666666667, calc:32.441, zinc:0.959, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:29.77333333333333, pot:297.79366666666664, fol:0},
{id:"taco_242", name:"Pear, Park, raw", cat:"Other", cal:60.58859, pro:0.23541666666666672, carb:16.074916666666663, fat:0.2303333333333333, fib:2.982666666666667, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.3213333333333333, calc:8.711999999999998, zinc:0.07266666666666667, b12:0, vitD:0, omega3:0, iod:0.9816666666666668, sel:0, mag:6.124, pot:102.22333333333331, fol:0},
{id:"taco_243", name:"Pêra, Williams, hard", cat:"Other", cal:53.309047826086925, pro:0.5652173913043479, carb:14.02478260869564, fat:0.11, fib:3.013333333333333, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.09333333333333334, calc:8.276666666666666, zinc:0.08, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:5.78, pot:115.86666666666667, fol:0},
{id:"taco_244", name:"Peach, Aurora, raw", cat:"Other", cal:36.327599024534216, pro:0.825, carb:9.321000000000005, fat:0, fib:1.4216666666666669, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.22366666666666668, calc:3.232333333333333, zinc:0.057, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:4.437666666666666, pot:123.78766666666667, fol:0},
{id:"taco_245", name:"Canned peaches in syrup", cat:"Other", cal:63.142434782608696, pro:0.7065217391304348, carb:16.880144927536232, fat:0, fib:1.0166666666666666, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.6033333333333334, calc:4.096666666666667, zinc:0.09166666666666667, b12:0, vitD:0, omega3:0, iod:3.201, sel:0, mag:4.038333333333333, pot:94.71666666666665, fol:0},
{id:"taco_246", name:"Raw pine cone", cat:"Other", cal:88.4735276668668, pro:1.4854166666666666, carb:22.447916666666668, fat:0.319, fib:3.356, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.21366666666666667, calc:20.88033333333333, zinc:0.24233333333333332, b12:0, vitD:0, omega3:0, iod:1.3373333333333335, sel:0, mag:30.538666666666668, pot:283.047, fol:0},
{id:"taco_247", name:"Raw pitanga.", cat:"Other", cal:41.41552999999997, pro:0.9291666666666665, carb:10.24416666666666, fat:0.169, fib:3.2373333333333334, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.39633333333333337, calc:17.879, zinc:0.35200000000000004, b12:0, vitD:0, omega3:0, iod:1.704, sel:0, mag:12.225333333333333, pot:113.43900000000001, fol:0},
{id:"taco_248", name:"Pitanga pulp, frozen", cat:"Other", cal:19.10545950235922, pro:0.28541666666666665, carb:4.7585833333333305, fat:0.12133333333333333, fib:0.7366666666666667, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.37233333333333335, calc:7.795, zinc:0.08733333333333333, b12:0, vitD:0, omega3:0, iod:5.029000000000001, sel:0, mag:6.203, pot:87.30866666666668, fol:0},
{id:"taco_249", name:"Pomegranate, raw", cat:"Other", cal:55.73900000000001, pro:0.4041666666666667, carb:15.105833333333335, fat:0, fib:0.4386666666666667, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.257, calc:4.7540000000000004, zinc:0.67, b12:0, vitD:0, omega3:0, iod:0.5913333333333333, sel:0, mag:12.701999999999998, pot:484.57066666666674, fol:0},
{id:"taco_250", name:"Raw tamarind", cat:"Other", cal:275.69564269441366, pro:3.20625, carb:72.53175, fat:0.455, fib:6.446666666666666, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.5533333333333333, calc:37.10433333333333, zinc:0.673, b12:0, vitD:0, omega3:0, iod:0.3553333333333333, sel:0, mag:59.109, pot:722.9926666666667, fol:0},
{id:"taco_251", name:"Tangerine, Ponkan, raw", cat:"Other", cal:37.83059999999995, pro:0.8478260869565218, carb:9.60999999999999, fat:0.07333333333333335, fib:0.94, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.11333333333333333, calc:12.89, zinc:0, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:7.733333333333333, pot:131.44333333333336, fol:0},
{id:"taco_252", name:"Tangerine, Ponkan, juice", cat:"Other", cal:36.10879999999999, pro:0.5217391304347826, carb:8.8, fat:0, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0, calc:4.283333333333334, zinc:0, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:6.46, pot:119.00333333333333, fol:0},
{id:"taco_253", name:"Tucumã, raw", cat:"Other", cal:262.01519507239266, pro:2.09375, carb:26.47458333333333, fat:19.076666666666668, fib:12.653333333333334, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.566, calc:46.33833333333333, zinc:0.8736666666666667, b12:0, vitD:0, omega3:0, iod:3.8930000000000002, sel:0, mag:121.01133333333333, pot:401.16966666666667, fol:0},
{id:"taco_254", name:"Raw umbu", cat:"Other", cal:37.016689999999976, pro:0.8416666666666668, carb:9.395333333333333, fat:0, fib:1.9820000000000002, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.09200000000000001, calc:11.561, zinc:0.42166666666666663, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:11.348999999999998, pot:151.8323333333333, fol:0},
{id:"taco_255", name:"Umbu fruit pulp, frozen", cat:"Other", cal:33.943290000000005, pro:0.5125, carb:8.78683333333333, fat:0.07033333333333334, fib:1.3363333333333334, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.209, calc:10.710333333333333, zinc:0.07266666666666666, b12:0, vitD:0, omega3:0, iod:5.771, sel:0, mag:8.121, pot:153.88433333333333, fol:0},
{id:"taco_256", name:"Grapes, Italy, raw", cat:"Other", cal:52.873100000000065, pro:0.7463768115942029, carb:13.573333333333345, fat:0.20333333333333334, fib:0.92, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.14, calc:6.66, zinc:0, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:4.983333333333333, pot:161.93666666666664, fol:0},
{id:"taco_257", name:"Grape, Ruby, raw", cat:"Other", cal:49.061289999999964, pro:0.6083333333333333, carb:12.69533333333333, fat:0.157, fib:0.9336666666666665, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.17066666666666666, calc:7.615666666666667, zinc:0, b12:0, vitD:0, omega3:0, iod:7.919, sel:0, mag:5.827333333333333, pot:158.89333333333335, fol:0},
{id:"taco_258", name:"Grapes, concentrated juice, packaged", cat:"Other", cal:57.655359999999995, pro:0, carb:14.708000000000002, fat:0, fib:0.2333333333333333, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.124, calc:9.317, zinc:0.054, b12:0, vitD:0, omega3:0, iod:9.583333333333334, sel:0, mag:7.058, pot:53.72633333333332, fol:0},
{id:"taco_259", name:"Palm oil", cat:"Other", cal:884.0, pro:0, carb:0, fat:100.0, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0, calc:0, zinc:0, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:0, pot:0, fol:0},
{id:"taco_260", name:"Extra virgin olive oil", cat:"Other", cal:884.0, pro:0, carb:0, fat:100.0, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0, calc:0, zinc:0, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:0, pot:0, fol:0},
{id:"taco_261", name:"Butter, with salt", cat:"Other", cal:725.9689268459988, pro:0.4147000074386597, carb:0.0632999925613329, fat:82.361, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.15400000000000003, calc:9.423, zinc:0, b12:0, vitD:0, omega3:0, iod:578.6946666666668, sel:0, mag:1.4673333333333334, pot:14.783, fol:0},
{id:"taco_262", name:"Butter, unsalted", cat:"Other", cal:757.5404607259967, pro:0.3955600070953369, carb:0.0, fat:86.03933333333333, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0, calc:3.608, zinc:0, b12:0, vitD:0, omega3:0, iod:3.848666666666667, sel:0, mag:1.429, pot:5.198333333333333, fol:0},
{id:"taco_263", name:"Margarine, with hydrogenated oil, with salt (65% lipids)", cat:"Other", cal:596.1195169563294, pro:0, carb:0.0, fat:67.43433333333334, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.08733333333333333, calc:5.556, zinc:0, b12:0, vitD:0, omega3:0, iod:894.0386666666667, sel:0, mag:1.1306666666666665, pot:21.419666666666668, fol:0},
{id:"taco_264", name:"Margarine, with hydrogenated oil, unsalted (80% lipids)", cat:"Other", cal:722.525625804901, pro:0, carb:0.0, fat:81.73366666666665, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.05266666666666667, calc:2.597, zinc:0, b12:0, vitD:0, omega3:0, iod:77.891, sel:0, mag:0.543, pot:1.7696666666666667, fol:0},
{id:"taco_265", name:"Margarine with interesterified oil, with salt (65% lipids)", cat:"Other", cal:594.4516933333332, pro:0, carb:0.0, fat:67.24566666666665, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0, calc:4.543333333333333, zinc:0, b12:0, vitD:0, omega3:0, iod:560.7976666666667, sel:0, mag:1.2336666666666667, pot:14.711333333333334, fol:0},
{id:"taco_266", name:"Margarine with interesterified oil, unsalted (65% lipids)", cat:"Other", cal:593.1374902381897, pro:0, carb:0.0, fat:67.097, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.07666666666666667, calc:4.963666666666667, zinc:0, b12:0, vitD:0, omega3:0, iod:33.19433333333333, sel:0, mag:1.1493333333333335, pot:4.73, fol:0},
{id:"taco_267", name:"Babassu oil", cat:"Other", cal:884.0, pro:0, carb:0, fat:100.0, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0, calc:0, zinc:0, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:0, pot:0, fol:0},
{id:"taco_268", name:"Canola oil", cat:"Other", cal:884.0, pro:0, carb:0, fat:100.0, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0, calc:0, zinc:0, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:0, pot:0, fol:0},
{id:"taco_269", name:"Sunflower oil", cat:"Other", cal:884.0, pro:0, carb:0, fat:100.0, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0, calc:0, zinc:0, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:0, pot:0, fol:0},
{id:"taco_270", name:"Corn oil", cat:"Other", cal:884.0, pro:0, carb:0, fat:100.0, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0, calc:0, zinc:0, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:0, pot:0, fol:0},
{id:"taco_271", name:"Pequi oil", cat:"Other", cal:884.0, pro:0, carb:0, fat:100.0, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0, calc:0, zinc:0, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:0, pot:0, fol:0},
{id:"taco_272", name:"Soybean oil", cat:"Other", cal:884.0, pro:0, carb:0, fat:100.0, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0, calc:0, zinc:0, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:0, pot:0, fol:0},
{id:"taco_273", name:"Haddock fillet, frozen, baked", cat:"Other", cal:111.6155034511884, pro:23.525, carb:0.0, fat:1.2376666666666667, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.5259999999999999, calc:22.607000000000003, zinc:0.5133333333333333, b12:0, vitD:0, omega3:0, iod:334.3913333333333, sel:0, mag:20.245666666666665, pot:155.636, fol:0},
{id:"taco_274", name:"Haddock fillet, frozen, cooked", cat:"Other", cal:91.10354839555423, pro:19.34583333333333, carb:0.0, fat:0.9420000000000001, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.3273333333333333, calc:16.73333333333333, zinc:0.435, b12:0, vitD:0, omega3:0, iod:189.33766666666665, sel:0, mag:15.742333333333335, pot:145.67033333333333, fol:0},
{id:"taco_275", name:"Haddock, fillet, frozen, raw", cat:"Other", cal:59.11303324858347, pro:13.083333333333332, carb:0.0, fat:0.36, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.106, calc:10.174666666666667, zinc:0.3906666666666667, b12:0, vitD:0, omega3:0, iod:78.515, sel:0, mag:14.497333333333335, pot:148.35133333333332, fol:0},
{id:"taco_276", name:"Haddock fillet, frozen, grilled", cat:"Other", cal:129.6435259028673, pro:27.610416666666666, carb:0.0, fat:1.3023333333333333, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.329, calc:20.173666666666666, zinc:0.4383333333333333, b12:0, vitD:0, omega3:0, iod:305.09366666666665, sel:0, mag:22.111666666666668, pot:278.63900000000007, fol:0},
{id:"taco_277", name:"Tuna, preserved in oil", cat:"Other", cal:165.91056057890256, pro:26.1875, carb:0.0, fat:5.996666666666666, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:1.22975, calc:6.516, zinc:0.5882499999999999, b12:0, vitD:0, omega3:0, iod:362.1465, sel:0, mag:29.481499999999997, pot:279.86449999999996, fol:0},
{id:"taco_278", name:"Tuna, fresh, raw", cat:"Other", cal:117.50099999999998, pro:25.68, carb:0.0, fat:0.87, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:1.2733333333333332, calc:6.69, zinc:0.4, b12:0, vitD:0, omega3:0, iod:30.30333333333333, sel:0, mag:32.22666666666667, pot:307.7633333333333, fol:0},
{id:"taco_279", name:"Salted, raw cod", cat:"Other", cal:135.89296666666664, pro:29.036666666666665, carb:0.0, fat:1.32, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.8533333333333334, calc:156.96666666666667, zinc:0.67, b12:0, vitD:0, omega3:0, iod:13585.056666666665, sel:0, mag:49.473333333333336, pot:433.8966666666667, fol:0},
{id:"taco_280", name:"Salted, sautéed cod", cat:"Other", cal:139.66070105353995, pro:23.979166666666664, carb:1.2241666666666786, fat:3.606666666666667, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.15266666666666664, calc:59.12366666666666, zinc:0.556, b12:0, vitD:0, omega3:0, iod:1256.2766666666666, sel:0, mag:15.0565, pot:50.22466666666667, fol:0},
{id:"taco_281", name:"Dogfish steak, with wheat flour, fried", cat:"Other", cal:208.33274372597532, pro:24.952083333333334, carb:3.100583333333332, fat:9.954333333333333, fib:0.5366666666666667, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.9983333333333334, calc:30.441999999999997, zinc:0.5540000000000002, b12:0, vitD:0, omega3:0, iod:160.03166666666667, sel:0, mag:25.507, pot:419.8903333333333, fol:0},
{id:"taco_282", name:"Dogfish, steak, cooked", cat:"Other", cal:116.01448068765795, pro:25.589583333333326, carb:0.0, fat:0.7479999999999999, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.317, calc:10.324666666666667, zinc:0.6056666666666666, b12:0, vitD:0, omega3:0, iod:114.90533333333333, sel:0, mag:21.122666666666667, pot:248.64, fol:0},
{id:"taco_283", name:"Dogfish, steak, raw", cat:"Other", cal:83.33302501956622, pro:17.854166666666668, carb:0.0, fat:0.7866666666666666, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.204, calc:8.703666666666665, zinc:0.31666666666666665, b12:0, vitD:0, omega3:0, iod:176.02366666666668, sel:0, mag:19.299000000000003, pot:299.02399999999994, fol:0},
{id:"taco_284", name:"Shrimp, Rio Grande, large, cooked", cat:"Other", cal:90.01368009630838, pro:18.966666666666665, carb:0.0, fat:1.0006666666666666, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:1.2779999999999998, calc:89.74400000000001, zinc:1.2376666666666667, b12:0, vitD:0, omega3:0, iod:366.55199999999996, sel:0, mag:18.911583333333333, pot:101.735, fol:0},
{id:"taco_285", name:"Shrimp, Rio Grande, large, raw", cat:"Other", cal:47.18343670543035, pro:9.991666666666667, carb:0.0, fat:0.501, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.6686666666666667, calc:51.11633333333333, zinc:0.7136666666666667, b12:0, vitD:0, omega3:0, iod:201.128, sel:0, mag:27.367, pot:72.00533333333333, fol:0},
{id:"taco_286", name:"Shrimp, Seven Beards variety, headless, with shell, fried.", cat:"Other", cal:231.24615385087333, pro:18.3875, carb:2.8798333333333326, fat:15.620333333333333, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:2.4389999999999996, calc:959.7013333333334, zinc:1.0979999999999999, b12:0, vitD:0, omega3:0, iod:99.055, sel:0, mag:73.97166666666666, pot:106.77366666666667, fol:0},
{id:"taco_287", name:"Crab, cooked", cat:"Other", cal:82.72150150783858, pro:18.479166666666668, carb:0.0, fat:0.423, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:2.861666666666667, calc:357.1526666666667, zinc:5.65, b12:0, vitD:0, omega3:0, iod:360.10566666666665, sel:0, mag:52.22533333333334, pot:185.8313333333333, fol:0},
{id:"taco_288", name:"Corimba, cru", cat:"Other", cal:128.1554, pro:17.366666666666667, carb:-0.026666666666666172, fat:5.986666666666667, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.5033333333333333, calc:40.053333333333335, zinc:0.4, b12:0, vitD:0, omega3:0, iod:47.01, sel:0, mag:22.766666666666666, pot:316.7366666666667, fol:0},
{id:"taco_289", name:"Corimbatá, roasted", cat:"Other", cal:261.45243941056725, pro:19.897916666666667, carb:0.0, fat:19.566333333333333, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.9713333333333333, calc:22.304333333333332, zinc:0.7476666666666666, b12:0, vitD:0, omega3:0, iod:40.425999999999995, sel:0, mag:24.212, pot:326.4973333333333, fol:0},
{id:"taco_290", name:"Corimbatá, cooked", cat:"Other", cal:238.69610486733916, pro:20.13125, carb:0.0, fat:16.933000000000003, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.6226666666666666, calc:64.68566666666666, zinc:0.9540000000000001, b12:0, vitD:0, omega3:0, iod:37.16566666666667, sel:0, mag:22.828999999999997, pot:253.992, fol:0},
{id:"taco_291", name:"Raw freshwater corvina", cat:"Other", cal:101.00903333333332, pro:18.916666666666668, carb:0.0, fat:2.2433333333333336, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.25666666666666665, calc:39.43, zinc:0.36, b12:0, vitD:0, omega3:0, iod:45.09, sel:0, mag:24.5, pot:293.0233333333333, fol:0},
{id:"taco_292", name:"Sea bass, raw", cat:"Other", cal:94.0, pro:18.57, carb:0.0, fat:1.5833333333333333, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.37666666666666665, calc:0, zinc:0.35666666666666663, b12:0, vitD:0, omega3:0, iod:67.97, sel:0, mag:23.75, pot:338.7033333333333, fol:0},
{id:"taco_293", name:"Large sea bass, baked", cat:"Other", cal:146.52814112536112, pro:26.766666666666666, carb:0.0, fat:3.5736666666666665, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.5383333333333334, calc:60.225, zinc:0.6746666666666666, b12:0, vitD:0, omega3:0, iod:85.35199999999999, sel:0, mag:24.101333333333333, pot:291.46, fol:0},
{id:"taco_294", name:"Large corvina, cooked", cat:"Other", cal:100.07812455296516, pro:23.4375, carb:0.0, fat:2.5626666666666664, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.5786666666666667, calc:69.37366666666667, zinc:0.6886666666666666, b12:0, vitD:0, omega3:0, iod:68.39, sel:0, mag:22.22266666666667, pot:194.03533333333334, fol:0},
{id:"taco_295", name:"Freshwater gilthead bream", cat:"Other", cal:131.2083147237698, pro:18.810416666666665, carb:0.0, fat:5.641666666666667, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.152, calc:12.133000000000001, zinc:0.47700000000000004, b12:0, vitD:0, omega3:0, iod:40.297666666666665, sel:0, mag:26.262666666666664, pot:392.5056666666667, fol:0},
{id:"taco_296", name:"Lambari, frozen, raw", cat:"Other", cal:130.84031100948653, pro:16.8125, carb:0.0, fat:6.546666666666667, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.9056666666666667, calc:1181.277, zinc:3.3366666666666664, b12:0, vitD:0, omega3:0, iod:47.92, sel:0, mag:44.693000000000005, pot:244.40133333333333, fol:0},
{id:"taco_297", name:"Lambari, frozen, fried", cat:"Other", cal:326.86839988660813, pro:28.425, carb:0.0, fat:22.782, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.8133333333333334, calc:1881.039, zinc:5.625, b12:0, vitD:0, omega3:0, iod:64.55166666666666, sel:0, mag:66.29066666666667, pot:331.16900000000004, fol:0},
{id:"taco_298", name:"Lambari, fresh, raw", cat:"Other", cal:151.598346503218, pro:15.652083333333334, carb:0.0, fat:9.397333333333334, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.6313333333333334, calc:590.2719999999999, zinc:2.4179999999999997, b12:0, vitD:0, omega3:0, iod:41.10933333333333, sel:0, mag:31.60766666666667, pot:207.35833333333335, fol:0},
{id:"taco_299", name:"Manjuba, with wheat flour, fried", cat:"Other", cal:343.55045872306823, pro:23.45, carb:10.24033333333333, fat:22.593, fib:0.3633333333333333, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:3.0413333333333328, calc:763.3073333333333, zinc:3.767333333333333, b12:0, vitD:0, omega3:0, iod:36.52, sel:0, mag:46.89666666666667, pot:319.265, fol:0},
{id:"taco_300", name:"Fried anchovies", cat:"Other", cal:349.32523145536584, pro:30.13958333333333, carb:0.0, fat:24.46, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.9163333333333333, calc:575.029, zinc:3.235, b12:0, vitD:0, omega3:0, iod:40.61, sel:0, mag:31.657999999999998, pot:318.18, fol:0},
{id:"taco_301", name:"Hake fillet, baked", cat:"Other", cal:121.91021833333333, pro:26.604166666666668, carb:0.0, fat:0.9213333333333334, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.37133333333333335, calc:35.90566666666667, zinc:0.8873333333333333, b12:0, vitD:0, omega3:0, iod:119.94866666666667, sel:0, mag:20.268333333333334, pot:363.57, fol:0},
{id:"taco_302", name:"Hake, fillet, cru", cat:"Other", cal:89.13086666666665, pro:16.606666666666666, carb:0.0, fat:2.02, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.18666666666666668, calc:20.4, zinc:0.32666666666666666, b12:0, vitD:0, omega3:0, iod:79.50333333333333, sel:0, mag:27.02, pot:339.5266666666667, fol:0},
{id:"taco_303", name:"Hake fillet, fried", cat:"Other", cal:191.62747837583225, pro:26.929166666666664, carb:0.0, fat:8.496666666666668, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.3833333333333333, calc:35.62766666666666, zinc:0.5573333333333333, b12:0, vitD:0, omega3:0, iod:89.96133333333334, sel:0, mag:38.135999999999996, pot:446.6193333333333, fol:0},
{id:"taco_304", name:"White hake, raw", cat:"Other", cal:110.87629999999999, pro:16.263333333333332, carb:0.0, fat:4.593333333333334, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.16333333333333333, calc:15.74, zinc:0.25, b12:0, vitD:0, omega3:0, iod:76.16666666666667, sel:0, mag:19.203333333333333, pot:261.39666666666665, fol:0},
{id:"taco_305", name:"White hake, fried", cat:"Other", cal:223.0397323693037, pro:27.35625, carb:0.0, fat:11.777000000000001, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.5066666666666667, calc:378.27, zinc:1.1243333333333334, b12:0, vitD:0, omega3:0, iod:107.23266666666667, sel:0, mag:30.076666666666668, pot:355.1496666666667, fol:0},
{id:"taco_306", name:"Hake fillet, with wheat flour, fried", cat:"Other", cal:283.4252144319614, pro:21.435416666666665, carb:5.033250000000005, fat:19.115, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.9373333333333332, calc:26.43433333333333, zinc:0.42966666666666664, b12:0, vitD:0, omega3:0, iod:90.50666666666666, sel:0, mag:28.397000000000002, pot:216.37433333333334, fol:0},
{id:"taco_307", name:"Hake fillet, raw", cat:"Other", cal:107.20556666666666, pro:16.65, carb:0.0, fat:4.003333333333334, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.17333333333333334, calc:13.546666666666667, zinc:0.25333333333333335, b12:0, vitD:0, omega3:0, iod:77.49666666666667, sel:0, mag:22.8, pot:253.05666666666664, fol:0},
{id:"taco_308", name:"Hake fillet, fried", cat:"Other", cal:154.270025, pro:28.5875, carb:0.0, fat:3.57, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.32033333333333336, calc:10.324666666666667, zinc:0.6056666666666666, b12:0, vitD:0, omega3:0, iod:114.90533333333333, sel:0, mag:21.122666666666667, pot:248.64, fol:0},
{id:"taco_309", name:"Hake fillet with escabeche sauce.", cat:"Other", cal:141.9583228750229, pro:11.75, carb:5.0153333333333405, fat:8.024, fib:0.78, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:1.4743333333333333, calc:20.116333333333333, zinc:0.29, b12:0, vitD:0, omega3:0, iod:51.28766666666667, sel:0, mag:18.063, pot:208.24300000000002, fol:0},
{id:"taco_310", name:"Raw whiting", cat:"Other", cal:76.40890833333334, pro:15.47916666666667, carb:0.0, fat:1.1433333333333333, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.547, calc:331.5973333333333, zinc:0.5516666666666666, b12:0, vitD:0, omega3:0, iod:120.33866666666665, sel:0, mag:33.775, pot:303.83099999999996, fol:0},
{id:"taco_311", name:"Painted, roasted", cat:"Other", cal:191.55914112758637, pro:36.45, carb:0.0, fat:3.9820000000000007, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.7770000000000001, calc:113.54199999999999, zinc:2.0989999999999998, b12:0, vitD:0, omega3:0, iod:80.95266666666667, sel:0, mag:42.35766666666667, pot:527.1529999999999, fol:0},
{id:"taco_312", name:"Painted, raw", cat:"Other", cal:91.08323333333333, pro:18.55666666666667, carb:0.0, fat:1.3133333333333335, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.21666666666666667, calc:12.003333333333336, zinc:0.39333333333333337, b12:0, vitD:0, omega3:0, iod:43.336666666666666, sel:0, mag:23.69666666666667, pot:293.6466666666667, fol:0},
{id:"taco_313", name:"Painted, grilled", cat:"Other", cal:152.19008833333334, pro:30.795833333333334, carb:0.0, fat:2.294, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.47533333333333333, calc:68.97633333333333, zinc:0.7563333333333334, b12:0, vitD:0, omega3:0, iod:53.08866666666666, sel:0, mag:26.740333333333336, pot:360.15333333333336, fol:0},
{id:"taco_314", name:"Piglet, raw", cat:"Other", cal:93.02456666666666, pro:20.49, carb:0.0, fat:0.6133333333333333, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.38666666666666666, calc:25.88333333333333, zinc:0.6566666666666666, b12:0, vitD:0, omega3:0, iod:66.73, sel:0, mag:24.35, pot:313.4166666666667, fol:0},
{id:"taco_315", name:"Salmon fillet, skin on, fresh, grilled", cat:"Other", cal:228.73177513531843, pro:23.91875, carb:0.0, fat:14.035333333333334, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.5436666666666666, calc:28.75733333333333, zinc:0.5596666666666668, b12:0, vitD:0, omega3:0, iod:85.135, sel:0, mag:27.786, pot:383.9363333333333, fol:0},
{id:"taco_316", name:"Salmon, skinless, fresh, raw", cat:"Other", cal:169.78157991055645, pro:19.252083333333335, carb:0.0, fat:9.708999999999998, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.24, calc:8.748, zinc:0.34400000000000003, b12:0, vitD:0, omega3:0, iod:64.24166666666667, sel:0, mag:27.421666666666667, pot:376.4956666666667, fol:0},
{id:"taco_317", name:"Fresh, skinless, grilled salmon.", cat:"Other", cal:242.7065694870949, pro:26.14166666666667, carb:0.0, fat:14.532333333333334, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.37266666666666665, calc:15.085999999999999, zinc:0.49733333333333335, b12:0, vitD:0, omega3:0, iod:95.81133333333332, sel:0, mag:37.86033333333334, pot:517.902, fol:0},
{id:"taco_318", name:"Grilled sardines", cat:"Other", cal:164.3507883333333, pro:32.17916666666667, carb:0.0, fat:2.9873333333333334, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:1.2510000000000001, calc:437.7273333333333, zinc:1.8203333333333334, b12:0, vitD:0, omega3:0, iod:74.46833333333332, sel:0, mag:51.361333333333334, pot:574.3386666666667, fol:0},
{id:"taco_319", name:"Sardines, preserved in oil", cat:"Other", cal:284.9810048712492, pro:15.939583333333335, carb:0.0, fat:24.048666666666666, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:3.537333333333333, calc:550.2433333333333, zinc:1.6383333333333334, b12:0, vitD:0, omega3:0, iod:665.8403333333333, sel:0, mag:35.27, pot:367.13366666666667, fol:0},
{id:"taco_320", name:"Fried sardines", cat:"Other", cal:257.0407, pro:33.38333333333334, carb:0.0, fat:12.693333333333333, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:1.1236666666666668, calc:482.0746666666667, zinc:1.6426666666666667, b12:0, vitD:0, omega3:0, iod:60.099, sel:0, mag:38.83266666666666, pot:459.94266666666664, fol:0},
{id:"taco_321", name:"Whole, raw sardines", cat:"Other", cal:113.90036666666666, pro:21.076666666666668, carb:0.0, fat:2.65, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:1.3366666666666667, calc:167.33333333333334, zinc:1.29, b12:0, vitD:0, omega3:0, iod:60.38666666666668, sel:0, mag:28.526666666666667, pot:312.37, fol:0},
{id:"taco_322", name:"Tucunaré fillet, frozen, raw", cat:"Other", cal:87.686483549277, pro:17.958333333333336, carb:-0.04500000000000792, fat:1.22, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.26933333333333337, calc:19.220333333333333, zinc:0.441, b12:0, vitD:0, omega3:0, iod:56.55433333333334, sel:0, mag:25.641000000000002, pot:288.063, fol:0},
{id:"taco_323", name:"Alleged", cat:"Other", cal:128.85725581200919, pro:13.45, carb:2.862000000000004, fat:6.690666666666666, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.8776666666666667, calc:22.577333333333332, zinc:1.6496666666666666, b12:0, vitD:0, omega3:0, iod:942.933, sel:0, mag:15.262, pot:270.07366666666667, fol:0},
{id:"taco_324", name:"Beef broth, tablet", cat:"Other", cal:240.62333333333333, pro:7.82, carb:15.053333333333342, fat:16.57, fib:0.5766666666666667, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0, calc:129.03, zinc:0, b12:0, vitD:0, omega3:0, iod:22179.666666666668, sel:0, mag:22.06, pot:218.15333333333334, fol:0},
{id:"taco_325", name:"Chicken broth, tablet", cat:"Other", cal:251.44566666666665, pro:6.279166666666666, carb:10.645499999999991, fat:20.416333333333334, fib:11.810666666666668, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.6893333333333334, calc:16.36, zinc:0.258, b12:0, vitD:0, omega3:0, iod:22299.900333333335, sel:0, mag:12.790666666666667, pot:68.028, fol:0},
{id:"taco_326", name:"Beef, chuck, ground, cooked", cat:"Other", cal:212.42039999999997, pro:26.68666666666667, carb:0.0, fat:10.916666666666666, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:2.6533333333333338, calc:4.026666666666666, zinc:8.1, b12:0, vitD:0, omega3:0, iod:52.35666666666666, sel:0, mag:17.07, pot:255.70666666666668, fol:0},
{id:"taco_327", name:"Beef, chuck, ground, raw", cat:"Other", cal:136.56233333333333, pro:19.42, carb:0.0, fat:5.946666666666666, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:1.7633333333333334, calc:2.61, zinc:6.333333333333333, b12:0, vitD:0, omega3:0, iod:48.61333333333334, sel:0, mag:14.136666666666668, pot:237.3033333333333, fol:0},
{id:"taco_328", name:"Meat, beef, chuck, lean, cooked", cat:"Other", cal:214.61056666666664, pro:27.27, carb:0.0, fat:10.883333333333333, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:2.3666666666666667, calc:7.11, zinc:7.97, b12:0, vitD:0, omega3:0, iod:56.173333333333325, sel:0, mag:14.44, pot:254.42333333333332, fol:0},
{id:"taco_329", name:"Meat, beef, chuck, lean, raw", cat:"Other", cal:144.02943333333332, pro:20.816666666666666, carb:0.0, fat:6.113333333333333, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:1.5133333333333334, calc:4.716666666666668, zinc:5.213333333333334, b12:0, vitD:0, omega3:0, iod:49.846666666666664, sel:0, mag:13.276666666666666, pot:233.65, fol:0},
{id:"taco_330", name:"Meat, beef, meatballs, raw", cat:"Other", cal:189.2566666666666, pro:12.3125, carb:9.794166666666655, fat:11.203333333333333, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:1.5623333333333331, calc:22.231666666666666, zinc:2.3333333333333335, b12:0, vitD:0, omega3:0, iod:621.2516666666667, sel:0, mag:23.750666666666664, pot:328.24066666666664, fol:0},
{id:"taco_331", name:"Beef, meatballs, fries", cat:"Other", cal:271.813, pro:18.15625, carb:14.286749999999996, fat:15.782333333333334, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:1.9116666666666668, calc:26.75933333333333, zinc:2.608333333333333, b12:0, vitD:0, omega3:0, iod:1030.2556666666667, sel:0, mag:48.11966666666667, pot:536.0993333333334, fol:0},
{id:"taco_332", name:"Beef tripe stew", cat:"Other", cal:133.02286666666666, pro:21.64, carb:0.0, fat:4.503333333333334, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.5766666666666667, calc:13.21, zinc:2.493333333333333, b12:0, vitD:0, omega3:0, iod:38.203333333333326, sel:0, mag:7.413333333333334, pot:69.81, fol:0},
{id:"taco_333", name:"Beef tripe, raw", cat:"Other", cal:137.30316666666667, pro:20.53, carb:0.0, fat:5.503333333333333, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.47333333333333333, calc:9.073333333333332, zinc:2.1266666666666665, b12:0, vitD:0, omega3:0, iod:45.00333333333334, sel:0, mag:6.403333333333333, pot:84.56666666666666, fol:0},
{id:"taco_334", name:"Raw beef, sirloin cap, with fat.", cat:"Other", cal:216.9089666666667, pro:19.19666666666667, carb:0.0, fat:14.96, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:1.51, calc:5.86, zinc:3.543333333333333, b12:0, vitD:0, omega3:0, iod:57.54, sel:0, mag:17.453333333333333, pot:266.8866666666667, fol:0},
{id:"taco_335", name:"Beef, sirloin cap, with fat, grilled", cat:"Other", cal:311.7026666666667, pro:30.686666666666667, carb:0.0, fat:20.03, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:2.59, calc:7.256666666666667, zinc:6.196666666666666, b12:0, vitD:0, omega3:0, iod:80.51333333333334, sel:0, mag:18.38, pot:323.4533333333333, fol:0},
{id:"taco_336", name:"Meat, beef, sirloin cap, lean, raw", cat:"Other", cal:131.06246666666664, pro:21.54, carb:0.0, fat:4.333333333333333, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:2.0366666666666666, calc:6.496666666666667, zinc:4.586666666666667, b12:0, vitD:0, omega3:0, iod:79.17333333333333, sel:0, mag:19.586666666666666, pot:325.43, fol:0},
{id:"taco_337", name:"Meat, beef, sirloin cap, lean, grilled", cat:"Other", cal:239.44363333333328, pro:35.06333333333333, carb:-0.006666666666674814, fat:9.95, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:2.84, calc:8.843333333333334, zinc:7.636666666666667, b12:0, vitD:0, omega3:0, iod:82.75, sel:0, mag:25.613333333333333, pot:384.8433333333333, fol:0},
{id:"taco_338", name:"Beef, dried beef, stew", cat:"Other", cal:262.7801422621807, pro:36.364583333333336, carb:0.0, fat:11.918333333333335, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:3.4516666666666667, calc:14.851666666666667, zinc:6.086333333333333, b12:0, vitD:0, omega3:0, iod:1442.701, sel:0, mag:12.807333333333332, pot:89.56933333333335, fol:0},
{id:"taco_339", name:"Meat, beef, jerky, raw", cat:"Other", cal:248.86101810745396, pro:22.71458333333333, carb:0.0, fat:16.837, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:1.5266666666666666, calc:15.176, zinc:3.892333333333333, b12:0, vitD:0, omega3:0, iod:5875.0289999999995, sel:0, mag:13.360333333333331, pot:236.26366666666664, fol:0},
{id:"taco_340", name:"Beef, sirloin steak, breaded", cat:"Other", cal:351.5926591989994, pro:20.6125, carb:12.174499999999993, fat:23.998, fib:0.37, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:2.896333333333333, calc:14.672000000000002, zinc:2.858, b12:0, vitD:0, omega3:0, iod:77.09333333333333, sel:0, mag:27.036666666666665, pot:270.9633333333333, fol:0},
{id:"taco_341", name:"Beef, ribeye steak, raw", cat:"Other", cal:202.43739999999997, pro:19.8, carb:0.0, fat:13.07, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:1.5566666666666666, calc:3.16, zinc:4.35, b12:0, vitD:0, omega3:0, iod:38.52333333333333, sel:0, mag:14.003333333333336, pot:245.07, fol:0},
{id:"taco_342", name:"Beef, ribeye steak, grilled", cat:"Other", cal:274.91426666666666, pro:29.88, carb:0.0, fat:16.333333333333332, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:2.793333333333333, calc:4.286666666666666, zinc:6.68, b12:0, vitD:0, omega3:0, iod:50.88333333333333, sel:0, mag:23.566666666666666, pot:382.74, fol:0},
{id:"taco_343", name:"Beef, sirloin, with fat, raw", cat:"Other", cal:205.8567, pro:21.15, carb:0.0, fat:12.81, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:1.31, calc:3.673, zinc:2.79, b12:0, vitD:0, omega3:0, iod:44.133, sel:0, mag:18.157, pot:284.653, fol:0},
{id:"taco_344", name:"Beef, sirloin, with fat, grilled", cat:"Other", cal:278.05356666666665, pro:32.39666666666667, carb:0.0, fat:15.49, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:2.3533333333333335, calc:4.463333333333334, zinc:4.78, b12:0, vitD:0, omega3:0, iod:57.06666666666666, sel:0, mag:18.66, pot:351.86, fol:0},
{id:"taco_345", name:"Beef, sirloin, lean, raw", cat:"Other", cal:156.6158333333333, pro:23.996666666666666, carb:0.0, fat:6.003333333333334, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:1.68, calc:4.196666666666666, zinc:3.24, b12:0, vitD:0, omega3:0, iod:52.89333333333334, sel:0, mag:20.62666666666667, pot:334.6166666666667, fol:0},
{id:"taco_346", name:"Meat, beef, sirloin, lean, grilled", cat:"Other", cal:193.69156666666663, pro:35.88333333333333, carb:0.0, fat:4.486666666666667, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:2.3533333333333335, calc:4.996666666666667, zinc:5.136666666666667, b12:0, vitD:0, omega3:0, iod:57.51, sel:0, mag:21.06, pot:386.47, fol:0},
{id:"taco_347", name:"Beef, ribs, roasted", cat:"Other", cal:373.03886666666665, pro:28.80666666666667, carb:0.0, fat:27.72, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:2.18, calc:28.00666667, zinc:5.453333333333333, b12:0, vitD:0, omega3:0, iod:91.86, sel:0, mag:19.546666666666667, pot:270.00666666666666, fol:0},
{id:"taco_348", name:"Beef, ribs, raw", cat:"Other", cal:357.72246666666666, pro:16.706666666666667, carb:0.0, fat:31.75, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:1.2033333333333334, calc:0, zinc:2.6966666666666668, b12:0, vitD:0, omega3:0, iod:69.99666666666667, sel:0, mag:11.676666666666668, pot:151.16, fol:0},
{id:"taco_349", name:"Beef, rump steak, lean, cooked", cat:"Other", cal:216.616066666667, pro:31.88, carb:0.0, fat:8.923333333333334, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:1.7, calc:3.98, zinc:4.973333333333334, b12:0, vitD:0, omega3:0, iod:41.1, sel:0, mag:13.79, pot:251.66, fol:0},
{id:"taco_350", name:"Beef, rump, lean, raw", cat:"Other", cal:147.96633333333335, pro:21.513333333333335, carb:0.0, fat:6.22, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:1.8933333333333333, calc:2.953333333333333, zinc:2.806666666666667, b12:0, vitD:0, omega3:0, iod:48.546666666666674, sel:0, mag:21.11, pot:357.8766666666667, fol:0},
{id:"taco_351", name:"Beef, rump steak, lean, cooked", cat:"Other", cal:218.6751, pro:32.38333333333333, carb:0.0, fat:8.913333333333332, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:2.5566666666666666, calc:3.733333333333333, zinc:4.696666666666667, b12:0, vitD:0, omega3:0, iod:43.50333333333333, sel:0, mag:13.47, pot:238.50666666666666, fol:0},
{id:"taco_352", name:"Beef, rump steak, lean, raw", cat:"Other", cal:169.06596666666667, pro:21.23, carb:0.0, fat:8.693333333333333, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:1.8866666666666667, calc:2.986666666666667, zinc:2.6333333333333333, b12:0, vitD:0, omega3:0, iod:60.53333333333333, sel:0, mag:20.716666666666665, pot:334.90333333333336, fol:0},
{id:"taco_353", name:"Beef, brisket, roast", cat:"Other", cal:330.1002908333333, pro:28.63125, carb:0.0, fat:23.042666666666666, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:2.703333333333333, calc:7.623333333333332, zinc:5.286666666666666, b12:0, vitD:0, omega3:0, iod:71.58666666666667, sel:0, mag:18.206666666666667, pot:321.0733333333333, fol:0},
{id:"taco_354", name:"Beef, brisket, raw", cat:"Other", cal:221.3975, pro:19.536666666666665, carb:0.0, fat:15.296666666666667, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:1.13, calc:3.5666666666666664, zinc:2.4233333333333333, b12:0, vitD:0, omega3:0, iod:46.86, sel:0, mag:12.76, pot:150.58, fol:0},
{id:"taco_355", name:"Beef, liver, raw", cat:"Other", cal:141.04586666666665, pro:20.713333333333335, carb:1.106666666666668, fat:5.3566666666666665, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:5.626666666666666, calc:4.156666666666666, zinc:3.4633333333333334, b12:0, vitD:0, omega3:0, iod:75.92, sel:0, mag:12.42, pot:264.5, fol:0},
{id:"taco_356", name:"Beef, liver, grilled", cat:"Other", cal:225.0264, pro:29.86, carb:4.2, fat:9.01, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:5.79, calc:5.56, zinc:3.95, b12:0, vitD:0, omega3:0, iod:82.19, sel:0, mag:9.696666666666665, pot:309.37, fol:0},
{id:"taco_357", name:"Beef, tenderloin, lean, raw", cat:"Other", cal:142.86426666666665, pro:21.6, carb:0.0, fat:5.613333333333333, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:1.92, calc:2.93, zinc:2.7533333333333334, b12:0, vitD:0, omega3:0, iod:48.86, sel:0, mag:21.39, pot:321.5333333333333, fol:0},
{id:"taco_358", name:"Beef, filet mignon, lean, grilled", cat:"Other", cal:219.70259999999996, pro:32.8, carb:0.0, fat:8.83, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:2.87, calc:4.31, zinc:4.133333333333333, b12:0, vitD:0, omega3:0, iod:57.906666666666666, sel:0, mag:28.26, pot:325.98, fol:0},
{id:"taco_359", name:"Beef, flank, lean, cooked", cat:"Other", cal:195.5753666666667, pro:29.37666666666667, carb:0.0, fat:7.77, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:2.77, calc:3.533333333333333, zinc:5.553333333333334, b12:0, vitD:0, omega3:0, iod:41.68, sel:0, mag:13.613333333333335, pot:248.8, fol:0},
{id:"taco_360", name:"Beef, flank, lean, raw", cat:"Other", cal:141.46009999999998, pro:19.996666666666666, carb:0.0, fat:6.216666666666666, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:1.58, calc:2.813333333333333, zinc:4.45, b12:0, vitD:0, omega3:0, iod:54.223333333333336, sel:0, mag:17.846666666666668, pot:324.11, fol:0},
{id:"taco_361", name:"Beef, flank steak, with fat, cooked", cat:"Other", cal:338.44573333333335, pro:24.24, carb:0.0, fat:26.046666666666667, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:2.03, calc:3.2133333333333334, zinc:6.5, b12:0, vitD:0, omega3:0, iod:38.78333333333333, sel:0, mag:14.476666666666667, pot:206.76333333333332, fol:0},
{id:"taco_362", name:"Beef, flank steak, with fat, raw", cat:"Other", cal:220.72376666666662, pro:17.583333333333332, carb:0.0, fat:16.146666666666665, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:1.5433333333333332, calc:3.106666666666667, zinc:4.193333333333333, b12:0, vitD:0, omega3:0, iod:51.2, sel:0, mag:16.116666666666667, pot:274.1166666666666, fol:0},
{id:"taco_363", name:"Beef, rump roast, stewed", cat:"Other", cal:222.46856666666667, pro:32.86333333333334, carb:0.0, fat:9.106666666666667, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:1.85, calc:3.533333333333333, zinc:6.96, b12:0, vitD:0, omega3:0, iod:47.54333333333333, sel:0, mag:12.956666666666669, pot:254.44, fol:0},
{id:"taco_364", name:"Beef, rump, raw", cat:"Other", cal:134.86456666666663, pro:20.543333333333333, carb:0.0, fat:5.226666666666667, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:1.3233333333333335, calc:2.5933333333333333, zinc:2.393333333333333, b12:0, vitD:0, omega3:0, iod:53.55666666666667, sel:0, mag:19.67, pot:361.84, fol:0},
{id:"taco_365", name:"Beef, tongue, cooked", cat:"Other", cal:314.9016, pro:21.366666666666664, carb:0.0, fat:24.796666666666667, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:2.07, calc:5.93, zinc:4.086666666666667, b12:0, vitD:0, omega3:0, iod:59.06333333333333, sel:0, mag:11.54, pot:175.28666666666666, fol:0},
{id:"taco_366", name:"Beef, tongue, raw", cat:"Other", cal:215.24976666666663, pro:17.09, carb:0.0, fat:15.773333333333333, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:1.7, calc:5.043333333333333, zinc:2.8733333333333335, b12:0, vitD:0, omega3:0, iod:73.05, sel:0, mag:15.303333333333333, pot:250.71333333333334, fol:0},
{id:"taco_367", name:"Beef, rump steak, raw", cat:"Other", cal:152.76586666666665, pro:20.933333333333334, carb:0.0, fat:7.026666666666666, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:1.1466666666666667, calc:2.83, zinc:3.48, b12:0, vitD:0, omega3:0, iod:37.416666666666664, sel:0, mag:15.656666666666666, pot:273.6566666666667, fol:0},
{id:"taco_368", name:"Beef, rump steak, grilled", cat:"Other", cal:153.0896758333333, pro:30.735416666666666, carb:0.0, fat:2.422333333333333, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:2.43, calc:4.17, zinc:5.58, b12:0, vitD:0, omega3:0, iod:58.12, sel:0, mag:20.89, pot:386.4166666666667, fol:0},
{id:"taco_369", name:"Meat, beef, sirloin tip, lean, raw", cat:"Other", cal:162.87123333333332, pro:21.61, carb:0.0, fat:7.826666666666667, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:1.9666666666666668, calc:3.186666666666667, zinc:2.9566666666666666, b12:0, vitD:0, omega3:0, iod:43.053333333333335, sel:0, mag:20.02, pot:298.74333333333334, fol:0},
{id:"taco_370", name:"Meat, beef, sirloin tip, lean, grilled", cat:"Other", cal:241.36396666666667, pro:31.93, carb:0.0, fat:11.643333333333336, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:3.1733333333333333, calc:4.51, zinc:4.823333333333333, b12:0, vitD:0, omega3:0, iod:51.62, sel:0, mag:25.97, pot:385.11, fol:0},
{id:"taco_371", name:"Beef, muscle, lean, cooked", cat:"Other", cal:193.80033333333333, pro:31.233333333333334, carb:0.0, fat:6.7, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:2.3633333333333333, calc:4.983333333333333, zinc:6.44, b12:0, vitD:0, omega3:0, iod:61.79, sel:0, mag:13.416666666666666, pot:252.5566666666667, fol:0},
{id:"taco_372", name:"Beef, muscle, lean, raw", cat:"Other", cal:141.581, pro:21.56, carb:0.0, fat:5.49, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:1.8633333333333333, calc:3.64, zinc:3.65, b12:0, vitD:0, omega3:0, iod:66.08, sel:0, mag:17.45, pot:295.83666666666664, fol:0},
{id:"taco_373", name:"Beef, shoulder cut, with fat, raw", cat:"Other", cal:158.7099, pro:21.41, carb:0.0, fat:7.46, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:1.76, calc:4.36, zinc:3.65, b12:0, vitD:0, omega3:0, iod:64.9, sel:0, mag:14.15, pot:249.68, fol:0},
{id:"taco_374", name:"Beef shoulder, lean, cooked", cat:"Other", cal:193.65239999999997, pro:29.72, carb:0.0, fat:7.4, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:2.17, calc:5.6433333333333335, zinc:6.816666666666666, b12:0, vitD:0, omega3:0, iod:57.623333333333335, sel:0, mag:17.66, pot:249.80666666666664, fol:0},
{id:"taco_375", name:"Meat, beef, shoulder, lean, raw", cat:"Other", cal:140.9415, pro:21.03, carb:0.0, fat:5.67, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:1.9266666666666665, calc:3.62, zinc:3.3366666666666664, b12:0, vitD:0, omega3:0, iod:65.86, sel:0, mag:17.513333333333335, pot:319.43, fol:0},
{id:"taco_376", name:"Meat, beef, rump steak, lean, raw", cat:"Other", cal:133.46889999999996, pro:21.72333333333333, carb:0.0, fat:4.513333333333333, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:1.78, calc:3.296666666666667, zinc:4.47, b12:0, vitD:0, omega3:0, iod:49.13, sel:0, mag:20.103333333333335, pot:317.6133333333333, fol:0},
{id:"taco_377", name:"Meat, beef, lean beef, grilled", cat:"Other", cal:219.25926666666663, pro:35.9, carb:0.0, fat:7.3133333333333335, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:3.033333333333333, calc:4.796666666666666, zinc:8.093333333333334, b12:0, vitD:0, omega3:0, iod:60.29333333333333, sel:0, mag:27.263333333333332, pot:420.96, fol:0},
{id:"taco_378", name:"Beef brisket, lean, cooked", cat:"Other", cal:338.4731333333333, pro:22.24666666666667, carb:0.0, fat:26.99333333333333, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:1.6, calc:4.026666666666666, zinc:3.893333333333333, b12:0, vitD:0, omega3:0, iod:55.70666666666667, sel:0, mag:13.873333333333335, pot:204.49, fol:0},
{id:"taco_379", name:"Beef, brisket, lean, raw", cat:"Other", cal:259.2756333333333, pro:17.55666666666667, carb:0.0, fat:20.433333333333334, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:1.31, calc:3.9433333333333334, zinc:2.63, b12:0, vitD:0, omega3:0, iod:63.76333333333333, sel:0, mag:15.323333333333332, pot:241.40333333333334, fol:0},
{id:"taco_380", name:"Raw beef, sirloin cap, with fat.", cat:"Other", cal:212.8794333333333, pro:18.823333333333334, carb:0.0, fat:14.69, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:1.7066666666666668, calc:2.4166666666666665, zinc:3.766666666666667, b12:0, vitD:0, omega3:0, iod:37.623333333333335, sel:0, mag:14.216666666666667, pot:231.65, fol:0},
{id:"taco_381", name:"Beef, sirloin cap, with fat, grilled", cat:"Other", cal:288.7670916666666, pro:26.42083333333333, carb:0.0, fat:19.506666666666664, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:3.2, calc:4.0, zinc:5.5, b12:0, vitD:0, omega3:0, iod:60.0, sel:0, mag:24.0, pot:355.0, fol:0},
{id:"taco_382", name:"Beef, sirloin, lean, raw", cat:"Other", cal:133.52236666666667, pro:21.25, carb:0.0, fat:4.743333333333333, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:2.1266666666666665, calc:3.393333333333333, zinc:4.226666666666667, b12:0, vitD:0, omega3:0, iod:61.14666666666667, sel:0, mag:20.25, pot:322.49666666666667, fol:0},
{id:"taco_383", name:"Beef, sirloin, lean, grilled", cat:"Other", cal:238.4681333333333, pro:31.906666666666666, carb:0.0, fat:11.333333333333334, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:3.5533333333333332, calc:4.43, zinc:6.7, b12:0, vitD:0, omega3:0, iod:60.656666666666666, sel:0, mag:25.416666666666668, pot:376.59666666666664, fol:0},
{id:"taco_384", name:"Beef, dried, cooked", cat:"Other", cal:312.79903369144597, pro:26.93125, carb:0.0, fat:21.929333333333332, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:1.8836666666666666, calc:12.763666666666666, zinc:7.698, b12:0, vitD:0, omega3:0, iod:1943.1793333333335, sel:0, mag:11.900666666666666, pot:86.02633333333334, fol:0},
{id:"taco_385", name:"Beef, dried, raw", cat:"Other", cal:312.7484279036522, pro:19.65833333333333, carb:0.0, fat:25.36666666666667, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:1.3296666666666668, calc:14.11, zinc:3.6503333333333337, b12:0, vitD:0, omega3:0, iod:4439.55, sel:0, mag:12.219666666666669, pot:190.154, fol:0},
{id:"taco_386", name:"Fried chicken croquette", cat:"Other", cal:283.048, pro:9.610416666666666, carb:34.520583333333335, fat:11.835999999999999, fib:4.9703333333333335, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:1.2616666666666667, calc:18.333333333333332, zinc:0.513, b12:0, vitD:0, omega3:0, iod:532.1293333333333, sel:0, mag:16.782666666666668, pot:166.205, fol:0},
{id:"taco_387", name:"Meat croquette, raw", cat:"Other", cal:245.77192529714108, pro:12.04375, carb:13.949583333333331, fat:15.561, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:2.508, calc:15.496666666666668, zinc:2.665, b12:0, vitD:0, omega3:0, iod:710.6373333333332, sel:0, mag:23.635, pot:221.39633333333333, fol:0},
{id:"taco_388", name:"Fried meat croquette", cat:"Other", cal:346.7420146474044, pro:16.8625, carb:18.146166666666673, fat:22.673333333333332, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:2.311, calc:18.087999999999997, zinc:3.3046666666666664, b12:0, vitD:0, omega3:0, iod:916.4110000000001, sel:0, mag:29.521666666666665, pot:313.019, fol:0},
{id:"taco_389", name:"Chicken pot pie, pre-cooked, baked", cat:"Other", cal:358.1916666666667, pro:6.94375, carb:47.49291666666666, fat:15.605, fib:2.164333333333333, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:1.1853333333333333, calc:15.609333333333334, zinc:0.643, b12:0, vitD:0, omega3:0, iod:524.9333333333334, sel:0, mag:18.304666666666666, pot:137.66366666666667, fol:0},
{id:"taco_390", name:"Chicken pie, pre-cooked", cat:"Other", cal:377.4796666666667, pro:7.34375, carb:35.52891666666668, fat:22.887666666666664, fib:2.220333333333333, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.747, calc:13.562666666666667, zinc:0.5023333333333334, b12:0, vitD:0, omega3:0, iod:770.7256666666666, sel:0, mag:17.334, pot:156.356, fol:0},
{id:"taco_391", name:"Chicken wing, with skin, raw", cat:"Other", cal:213.18833333333333, pro:18.1, carb:0.0, fat:15.066666666666668, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.5666666666666668, calc:10.916666666666666, zinc:1.2466666666666668, b12:0, vitD:0, omega3:0, iod:96.3, sel:0, mag:23.21666666666667, pot:211.15666666666667, fol:0},
{id:"taco_392", name:"Whole, free-range chicken, with skin, cooked.", cat:"Other", cal:242.88932666666665, pro:23.883333333333333, carb:0.0, fat:15.615666666666668, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:1.66, calc:16.762, zinc:1.6986666666666668, b12:0, vitD:0, omega3:0, iod:56.092000000000006, sel:0, mag:18.34866666666667, pot:210.00733333333332, fol:0},
{id:"taco_393", name:"Whole, skinless, free-range chicken, cooked.", cat:"Other", cal:195.76029666666665, pro:29.575, carb:0.0, fat:7.702333333333333, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:2.115, calc:66.1386666666667, zinc:2.658, b12:0, vitD:0, omega3:0, iod:53.24333333333334, sel:0, mag:23.16633333333333, pot:223.586, fol:0},
{id:"taco_394", name:"Chicken, heart, raw", cat:"Other", cal:221.50283333333334, pro:12.583333333333336, carb:0.0, fat:18.6, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:4.093333333333334, calc:5.506666666666667, zinc:2.006666666666667, b12:0, vitD:0, omega3:0, iod:95.06, sel:0, mag:19.833333333333332, pot:220.07, fol:0},
{id:"taco_395", name:"Chicken, heart, grilled", cat:"Other", cal:207.27364333333327, pro:22.439583333333335, carb:0.6074166666666578, fat:12.095999999999998, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:6.5263333333333335, calc:8.351666666666667, zinc:3.448, b12:0, vitD:0, omega3:0, iod:128.242, sel:0, mag:20.119, pot:242.69466666666665, fol:0},
{id:"taco_396", name:"Chicken thigh, skin on, roasted", cat:"Other", cal:215.1186475329399, pro:28.491666666666664, carb:0.05833333333334001, fat:10.361333333333333, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:1.216, calc:8.336333333333334, zinc:2.5516666666666663, b12:0, vitD:0, omega3:0, iod:94.84233333333334, sel:0, mag:13.927666666666667, pot:318.11, fol:0},
{id:"taco_397", name:"Chicken thigh, skin on, raw", cat:"Other", cal:161.47473333333332, pro:17.093333333333334, carb:0.0, fat:9.81, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.7033333333333333, calc:8.0, zinc:1.9733333333333334, b12:0, vitD:0, omega3:0, iod:94.95666666666666, sel:0, mag:25.813333333333333, pot:274.73333333333335, fol:0},
{id:"taco_398", name:"Chicken thigh, skinless, cooked", cat:"Other", cal:167.42803216441473, pro:26.858333333333334, carb:0.0, fat:5.847333333333332, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.8263333333333334, calc:11.780999999999999, zinc:2.8333333333333335, b12:0, vitD:0, omega3:0, iod:64.33933333333333, sel:0, mag:11.143666666666666, pot:191.13666666666666, fol:0},
{id:"taco_399", name:"Chicken thigh, skinless, raw", cat:"Other", cal:119.94746666666661, pro:17.813333333333333, carb:0.01999999999999702, fat:4.8566666666666665, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.7766666666666667, calc:7.97, zinc:2.24, b12:0, vitD:0, omega3:0, iod:98.36666666666667, sel:0, mag:27.23, pot:291.19, fol:0},
{id:"taco_400", name:"Chicken, liver, raw", cat:"Other", cal:106.48456666666667, pro:17.58666666666667, carb:-0.02333333333333809, fat:3.49, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:9.54, calc:5.61, zinc:3.7266666666666666, b12:0, vitD:0, omega3:0, iod:82.43333333333332, sel:0, mag:27.83, pot:280.5, fol:0},
{id:"taco_401", name:"Chicken, fillet, breaded", cat:"Other", cal:220.87277999999998, pro:28.46041666666667, carb:7.512916666666662, fat:7.790666666666667, fib:1.1303333333333334, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:1.0776666666666668, calc:8.912, zinc:0.8423333333333333, b12:0, vitD:0, omega3:0, iod:122.33233333333332, sel:0, mag:34.826, pot:407.559, fol:0},
{id:"taco_402", name:"Whole chicken, with skin, raw.", cat:"Other", cal:226.31916666666666, pro:16.44333333333333, carb:0.0, fat:17.30666666666667, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.6233333333333334, calc:6.3, zinc:1.1233333333333333, b12:0, vitD:0, omega3:0, iod:62.876666666666665, sel:0, mag:24.30333333333333, pot:217.24, fol:0},
{id:"taco_403", name:"Whole, skinless, roasted chicken.", cat:"Other", cal:187.3377966666667, pro:28.025, carb:0.0, fat:7.5023333333333335, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.5533333333333333, calc:9.064000000000002, zinc:1.5843333333333334, b12:0, vitD:0, omega3:0, iod:70.27133333333333, sel:0, mag:13.883666666666665, pot:283.2733333333333, fol:0},
{id:"taco_404", name:"Whole, skinless, cooked chicken", cat:"Other", cal:170.38997583333332, pro:24.985416666666662, carb:0.0, fat:7.062333333333334, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.462, calc:8.183333333333332, zinc:1.2416666666666667, b12:0, vitD:0, omega3:0, iod:50.89033333333333, sel:0, mag:12.346333333333334, pot:216.53333333333333, fol:0},
{id:"taco_405", name:"Whole, skinless, raw chicken.", cat:"Other", cal:129.09640000000002, pro:20.58666666666667, carb:0.0, fat:4.566666666666666, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.5366666666666667, calc:6.523333333333333, zinc:1.24, b12:0, vitD:0, omega3:0, iod:72.96, sel:0, mag:27.036666666666665, pot:237.68, fol:0},
{id:"taco_406", name:"Roast chicken breast, skin on.", cat:"Other", cal:211.68314953072866, pro:33.416666666666664, carb:0.0, fat:7.649, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.48166666666666663, calc:8.255666666666666, zinc:0.9506666666666667, b12:0, vitD:0, omega3:0, iod:55.702666666666666, sel:0, mag:18.143666666666665, pot:380.31333333333333, fol:0},
{id:"taco_407", name:"Chicken breast, skin on, raw.", cat:"Other", cal:149.46526666666665, pro:20.78, carb:0.0, fat:6.733333333333333, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.44333333333333336, calc:8.42, zinc:0.5966666666666667, b12:0, vitD:0, omega3:0, iod:62.31333333333333, sel:0, mag:28.29, pot:251.8166666666667, fol:0},
{id:"taco_408", name:"Chicken breast, skinless, cooked", cat:"Other", cal:162.87476334631444, pro:31.46875, carb:0.0, fat:3.16, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.3373333333333333, calc:6.44, zinc:0.9470000000000001, b12:0, vitD:0, omega3:0, iod:36.16833333333333, sel:0, mag:13.76, pot:231.0533333333333, fol:0},
{id:"taco_409", name:"Chicken breast, skinless, raw.", cat:"Other", cal:119.15926666666665, pro:21.526666666666667, carb:0.0, fat:3.02, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.43333333333333335, calc:7.363333333333333, zinc:0.6633333333333332, b12:0, vitD:0, omega3:0, iod:56.14, sel:0, mag:31.263333333333332, pot:267.08666666666664, fol:0},
{id:"taco_410", name:"Chicken breast, skinless, grilled", cat:"Other", cal:159.18500719261172, pro:32.03333333333334, carb:0.0, fat:2.4836666666666667, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.32866666666666666, calc:5.344333333333334, zinc:0.775, b12:0, vitD:0, omega3:0, iod:50.24933333333333, sel:0, mag:18.273666666666667, pot:387.37, fol:0},
{id:"taco_411", name:"Chicken thigh, skin on, roasted", cat:"Other", cal:259.60476916666664, pro:28.702083333333334, carb:0.0, fat:15.193666666666667, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:1.2133333333333332, calc:10.675333333333333, zinc:2.171333333333333, b12:0, vitD:0, omega3:0, iod:95.93533333333335, sel:0, mag:14.595, pot:323.0733333333333, fol:0},
{id:"taco_412", name:"Chicken thigh, skin on, raw", cat:"Other", cal:254.5322, pro:15.46, carb:0.0, fat:20.9, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.71, calc:7.09, zinc:1.3066666666666666, b12:0, vitD:0, omega3:0, iod:68.26666666666667, sel:0, mag:21.5, pot:190.19333333333336, fol:0},
{id:"taco_413", name:"Chicken thigh, skinless, roasted", cat:"Other", cal:232.88339666666667, pro:29.175, carb:0.0, fat:12.007333333333333, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:1.1693333333333333, calc:12.249333333333334, zinc:2.1816666666666666, b12:0, vitD:0, omega3:0, iod:106.07966666666665, sel:0, mag:17.233999999999998, pot:382.21, fol:0},
{id:"taco_414", name:"Chicken thigh, skinless, raw", cat:"Other", cal:161.79629999999997, pro:17.57, carb:0.0, fat:9.62, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.9033333333333333, calc:6.293333333333333, zinc:1.6733333333333331, b12:0, vitD:0, omega3:0, iod:79.74666666666667, sel:0, mag:26.33, pot:241.08666666666667, fol:0},
{id:"taco_415", name:"Hamburger, beef, raw", cat:"Other", cal:214.836, pro:13.15625, carb:4.15375, fat:16.177333333333333, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:1.891333333333333, calc:34.062333333333335, zinc:1.7016666666666669, b12:0, vitD:0, omega3:0, iod:869.459, sel:0, mag:24.523, pot:382.587, fol:0},
{id:"taco_416", name:"Hamburger, beef, fried", cat:"Other", cal:258.283, pro:19.972916666666666, carb:6.320083333333328, fat:17.012333333333334, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:3.016666666666667, calc:62.38566666666667, zinc:3.1803333333333335, b12:0, vitD:0, omega3:0, iod:1251.801, sel:0, mag:59.70166666666666, pot:660.0936666666666, fol:0},
{id:"taco_417", name:"Hamburger, beef, grilled", cat:"Other", cal:209.8316666666667, pro:13.15625, carb:11.333416666666674, fat:12.430333333333332, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:2.639, calc:56.213666666666676, zinc:3.018333333333333, b12:0, vitD:0, omega3:0, iod:1090.3343333333335, sel:0, mag:47.56666666666666, pot:537.5603333333333, fol:0},
{id:"taco_418", name:"Sausage, chicken, raw", cat:"Other", cal:218.10881416666666, pro:14.239583333333334, carb:0.0, fat:17.439666666666668, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.4656666666666667, calc:10.837666666666665, zinc:0.6940000000000001, b12:0, vitD:0, omega3:0, iod:1125.8113333333333, sel:0, mag:18.965999999999998, pot:279.732, fol:0},
{id:"taco_419", name:"Sausage, chicken, fried", cat:"Other", cal:245.46100666666663, pro:18.316666666666666, carb:0.0, fat:18.541999999999998, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.7893333333333333, calc:15.481666666666667, zinc:1.1646666666666665, b12:0, vitD:0, omega3:0, iod:1373.8936666666666, sel:0, mag:29.191999999999997, pot:363.7936666666667, fol:0},
{id:"taco_420", name:"Sausage, chicken, grilled", cat:"Other", cal:243.6585675, pro:18.189583333333335, carb:0.0, fat:18.402333333333335, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.7226666666666667, calc:13.925333333333333, zinc:1.0296666666666667, b12:0, vitD:0, omega3:0, iod:1351.4936666666665, sel:0, mag:21.100333333333335, pot:355.997, fol:0},
{id:"taco_421", name:"Sausage, pork, raw", cat:"Other", cal:227.2034508333333, pro:16.06458333333333, carb:0.0, fat:17.584, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.4443333333333333, calc:6.133666666666667, zinc:1.3579999999999999, b12:0, vitD:0, omega3:0, iod:1175.7223333333332, sel:0, mag:14.047333333333333, pot:316.3293333333333, fol:0},
{id:"taco_422", name:"Sausage, pork, fried", cat:"Other", cal:279.54358916666666, pro:20.452083333333334, carb:0.0, fat:21.30966666666667, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.8686666666666666, calc:8.475666666666667, zinc:3.0819999999999994, b12:0, vitD:0, omega3:0, iod:1431.5936666666666, sel:0, mag:18.217666666666666, pot:408.9403333333333, fol:0},
{id:"taco_423", name:"Sausage, pork, grilled", cat:"Other", cal:296.4896091666666, pro:23.16875, carb:0.0, fat:21.90233333333333, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:1.0113333333333332, calc:8.138666666666667, zinc:3.4753333333333334, b12:0, vitD:0, omega3:0, iod:1455.8603333333333, sel:0, mag:18.785, pot:426.6003333333333, fol:0},
{id:"taco_424", name:"Mortadella", cat:"Other", cal:268.8199890167316, pro:11.952083333333334, carb:5.81591666666666, fat:21.649333333333335, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:1.4696666666666667, calc:66.547, zinc:1.0193333333333332, b12:0, vitD:0, omega3:0, iod:1212.1670000000001, sel:0, mag:19.143333333333334, pot:247.282, fol:0},
{id:"taco_425", name:"Turkey, frozen, roasted", cat:"Other", cal:163.07139793137708, pro:26.20208333333333, carb:0.0, fat:5.675, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.5866666666666666, calc:13.841, zinc:1.2113333333333334, b12:0, vitD:0, omega3:0, iod:627.8756666666667, sel:0, mag:11.543333333333335, pot:175.12400000000002, fol:0},
{id:"taco_426", name:"Turkey, frozen, raw", cat:"Other", cal:93.72243382612864, pro:18.083333333333332, carb:0.0, fat:1.83, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.874, calc:9.881333333333334, zinc:1.4363333333333335, b12:0, vitD:0, omega3:0, iod:710.683, sel:0, mag:18.843333333333334, pot:281.354, fol:0},
{id:"taco_427", name:"Pork, chop, raw", cat:"Other", cal:164.11533659299215, pro:21.5, carb:0.0, fat:8.016666666666666, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.5333333333333333, calc:6.11, zinc:1.43, b12:0, vitD:0, omega3:0, iod:54.29, sel:0, mag:24.074333333333332, pot:334.9913333333334, fol:0},
{id:"taco_428", name:"Pork, steak, fried", cat:"Other", cal:311.1690453348557, pro:33.74791666666667, carb:0.0, fat:18.521666666666665, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.8210000000000001, calc:69.14566666666667, zinc:2.1643333333333334, b12:0, vitD:0, omega3:0, iod:63.026999999999994, sel:0, mag:29.125, pot:403.5133333333333, fol:0},
{id:"taco_429", name:"Pork, steak, grilled", cat:"Other", cal:280.0840349027713, pro:28.88958333333333, carb:0.0, fat:17.375333333333334, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.8646666666666666, calc:34.31366666666667, zinc:2.346666666666667, b12:0, vitD:0, omega3:0, iod:51.445, sel:0, mag:24.741, pot:366.416, fol:0},
{id:"taco_430", name:"Pork, ribs, roasted", cat:"Other", cal:402.16844745083654, pro:30.22291666666667, carb:0.0, fat:30.279, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:1.037, calc:16.771833333333333, zinc:3.0976666666666666, b12:0, vitD:0, omega3:0, iod:62.67933333333334, sel:0, mag:14.042333333333334, pot:245.9706666666667, fol:0},
{id:"taco_431", name:"Pork, ribs, raw", cat:"Other", cal:255.60634206136066, pro:18.0, carb:0.0, fat:19.816666666666666, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.8996666666666666, calc:14.527333333333333, zinc:2.2736666666666667, b12:0, vitD:0, omega3:0, iod:87.98166666666668, sel:0, mag:17.969333333333335, pot:248.22966666666665, fol:0},
{id:"taco_432", name:"Pork, loin, roast", cat:"Other", cal:210.2346655796369, pro:35.725, carb:0.0, fat:6.395666666666667, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.4573333333333333, calc:19.511333333333337, zinc:1.7583333333333335, b12:0, vitD:0, omega3:0, iod:38.924, sel:0, mag:18.142333333333333, pot:311.13866666666667, fol:0},
{id:"taco_433", name:"Pork loin, raw", cat:"Other", cal:175.6251952501138, pro:22.604166666666668, carb:0.0, fat:8.77, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.47333333333333333, calc:4.155, zinc:0.9316666666666666, b12:0, vitD:0, omega3:0, iod:53.06766666666667, sel:0, mag:23.915, pot:334.38399999999996, fol:0},
{id:"taco_434", name:"Pig, ear, salted, raw", cat:"Other", cal:258.49175833333334, pro:18.520833333333332, carb:0.0, fat:19.89, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:1.4076666666666666, calc:5.442666666666667, zinc:0.5686666666666667, b12:0, vitD:0, omega3:0, iod:615.602, sel:0, mag:2.0706666666666664, pot:228.46433333333334, fol:0},
{id:"taco_435", name:"Pork, leg, roast", cat:"Other", cal:262.2596066666666, pro:32.13333333333333, carb:0.0, fat:13.863666666666667, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:1.2516666666666667, calc:17.589, zinc:3.2546666666666666, b12:0, vitD:0, omega3:0, iod:62.40633333333333, sel:0, mag:27.346999999999998, pot:395.1903333333333, fol:0},
{id:"taco_436", name:"Pork, leg, raw", cat:"Other", cal:186.05575, pro:20.125, carb:0.0, fat:11.1, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.8873333333333333, calc:12.935666666666668, zinc:1.7309999999999999, b12:0, vitD:0, omega3:0, iod:101.89333333333333, sel:0, mag:22.882333333333335, pot:255.58266666666665, fol:0},
{id:"taco_437", name:"Pig, tail, salted, raw", cat:"Other", cal:377.41525749999994, pro:15.58125, carb:0.0, fat:34.466, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.6233333333333334, calc:21.629, zinc:1.4106666666666667, b12:0, vitD:0, omega3:0, iod:1157.6653333333334, sel:0, mag:3.595333333333333, pot:23.76066666666667, fol:0},
{id:"taco_438", name:"Ham with a layer of fat.", cat:"Other", cal:127.84921266563737, pro:14.370833333333334, carb:1.3975, fat:6.771333333333334, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.6790000000000002, calc:12.482333333333335, zinc:1.3246666666666667, b12:0, vitD:0, omega3:0, iod:1020.7716666666666, sel:0, mag:17.041666666666668, pot:294.58, fol:0},
{id:"taco_439", name:"Ham, without the fat layer.", cat:"Other", cal:93.7432807208697, pro:14.291666666666666, carb:2.1456666666666697, fat:2.7066666666666666, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.8276666666666666, calc:23.27433333333333, zinc:1.4589999999999999, b12:0, vitD:0, omega3:0, iod:1039.185, sel:0, mag:17.513333333333332, pot:307.3016666666667, fol:0},
{id:"taco_440", name:"Baked kibbeh", cat:"Other", cal:136.22887614158785, pro:14.59375, carb:12.86125, fat:2.6763333333333335, fib:1.8966666666666665, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:2.1526666666666663, calc:15.618, zinc:4.116333333333333, b12:0, vitD:0, omega3:0, iod:39.893, sel:0, mag:36.08, pot:287.77799999999996, fol:0},
{id:"taco_441", name:"Kibbeh, raw", cat:"Other", cal:109.49066929475465, pro:12.354166666666666, carb:10.774166666666666, fat:1.6676666666666666, fib:1.6466666666666665, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:1.654, calc:12.088000000000001, zinc:2.7533333333333334, b12:0, vitD:0, omega3:0, iod:38.766, sel:0, mag:25.694333333333333, pot:241.7396666666667, fol:0},
{id:"taco_442", name:"Kibbeh, fried", cat:"Other", cal:253.83130886964, pro:14.889583333333334, carb:12.337416666666657, fat:15.799, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:1.9526666666666668, calc:21.725666666666665, zinc:2.782, b12:0, vitD:0, omega3:0, iod:835.825, sel:0, mag:38.77266666666667, pot:322.46733333333333, fol:0},
{id:"taco_443", name:"Salami", cat:"Other", cal:397.8425065349341, pro:25.810416666666665, carb:2.9062500000000098, fat:30.641333333333336, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:1.2530000000000001, calc:87.01833333333333, zinc:3.1545, b12:0, vitD:0, omega3:0, iod:1574.1689999999999, sel:0, mag:29.915, pot:547.9989999999999, fol:0},
{id:"taco_444", name:"Bacon, raw", cat:"Other", cal:592.5311749999998, pro:11.479166666666666, carb:0.0, fat:60.25666666666666, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.43933333333333335, calc:2.3860000000000006, zinc:0.21066666666666667, b12:0, vitD:0, omega3:0, iod:49.586666666666666, sel:0, mag:3.568, pot:57.57, fol:0},
{id:"taco_445", name:"Fried bacon", cat:"Other", cal:696.5640066666666, pro:27.28333333333333, carb:0.0, fat:64.30866666666667, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.865, calc:9.443333333333333, zinc:0.8426666666666667, b12:0, vitD:0, omega3:0, iod:124.85033333333335, sel:0, mag:9.460333333333333, pot:170.859, fol:0},
{id:"taco_446", name:"Dairy drink, peach", cat:"Other", cal:55.164833333333306, pro:2.1333333333333333, carb:7.5700000000000065, fat:1.9066666666666665, fib:0.2933333333333334, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0, calc:88.63266666666665, zinc:0.24366666666666667, b12:0, vitD:0, omega3:0, iod:46.263, sel:0, mag:8.593333333333334, pot:62.263666666666666, fol:0},
{id:"taco_447", name:"Milk cream", cat:"Other", cal:221.48354127513312, pro:1.5078066937128702, carb:4.509526639620461, fat:22.479333333333333, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.301, calc:82.73366666666665, zinc:0.29233333333333333, b12:0, vitD:0, omega3:0, iod:51.724, sel:0, mag:7.540666666666667, pot:118.65033333333334, fol:0},
{id:"taco_448", name:"Natural yogurt", cat:"Other", cal:51.48953333333329, pro:4.0633333333333335, carb:1.9166666666666603, fat:3.04, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0, calc:143.10333333333332, zinc:0.443, b12:0, vitD:0, omega3:0, iod:51.61633333333333, sel:0, mag:11.253333333333332, pot:71.27866666666667, fol:0},
{id:"taco_449", name:"Plain, nonfat yogurt", cat:"Other", cal:41.49271128155834, pro:3.8343800687789917, carb:5.773953333333329, fat:0.3156666666666667, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0, calc:156.96133333333333, zinc:0.5136666666666666, b12:0, vitD:0, omega3:0, iod:59.644666666666666, sel:0, mag:11.983333333333334, pot:182.12966666666662, fol:0},
{id:"taco_450", name:"Yogurt, pineapple flavor", cat:"Other", cal:0, pro:0, carb:0, fat:0, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0, calc:0, zinc:0, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:0, pot:0, fol:0},
{id:"taco_451", name:"Strawberry flavored yogurt", cat:"Other", cal:69.56560000000003, pro:2.71, carb:9.693333333333342, fat:2.33, fib:0.21666666666666667, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0, calc:101.03166666666668, zinc:0.30433333333333334, b12:0, vitD:0, omega3:0, iod:37.663000000000004, sel:0, mag:8.04, pot:52.35366666666667, fol:0},
{id:"taco_452", name:"Yogurt, peach flavor", cat:"Other", cal:67.84940000000002, pro:2.53, carb:9.433333333333344, fat:2.3366666666666664, fib:0.7166666666666667, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.05299999999999999, calc:95.05, zinc:0.30033333333333334, b12:0, vitD:0, omega3:0, iod:36.96366666666666, sel:0, mag:7.956666666666667, pot:52.09033333333334, fol:0},
{id:"taco_453", name:"Condensed milk", cat:"Other", cal:312.57259999999997, pro:7.67, carb:56.99666666666666, fat:6.74, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.12666666666666668, calc:246.26666666666665, zinc:0.86, b12:0, vitD:0, omega3:0, iod:93.80333333333334, sel:0, mag:21.976666666666663, pot:328.93, fol:0},
{id:"taco_454", name:"Goat's milk", cat:"Other", cal:66.41574188654329, pro:3.0709067217508954, carb:5.246093333333333, fat:3.7543333333333333, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.103, calc:112.24733333333332, zinc:0.3546666666666667, b12:0, vitD:0, omega3:0, iod:73.947, sel:0, mag:9.798666666666668, pot:139.994, fol:0},
{id:"taco_455", name:"Milk, cow's milk, chocolate-flavored", cat:"Other", cal:82.82099627199361, pro:2.099020037651062, carb:14.158313333333325, fat:2.169, fib:0.6456666666666666, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.45766666666666667, calc:69.791, zinc:0.311, b12:0, vitD:0, omega3:0, iod:71.74166666666666, sel:0, mag:12.880666666666665, pot:155.23966666666666, fol:0},
{id:"taco_456", name:"Skimmed cow's milk powder", cat:"Other", cal:361.60799999999995, pro:34.69, carb:53.04333333333334, fat:0.9333333333333332, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.9266666666666667, calc:1363.17, zinc:3.8433333333333333, b12:0, vitD:0, omega3:0, iod:431.67333333333335, sel:0, mag:108.70666666666666, pot:1555.6633333333332, fol:0},
{id:"taco_457", name:"UHT skimmed cow's milk", cat:"Other", cal:0, pro:0, carb:0, fat:0, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0, calc:133.80666666666667, zinc:0.38, b12:0, vitD:0, omega3:0, iod:51.14, sel:0, mag:10.23, pot:140.02666666666667, fol:0},
{id:"taco_458", name:"Whole cow's milk", cat:"Other", cal:0, pro:0, carb:0, fat:0, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0, calc:122.58, zinc:0.38, b12:0, vitD:0, omega3:0, iod:63.76, sel:0, mag:9.636666666666668, pot:133.19, fol:0},
{id:"taco_459", name:"Whole cow's milk powder", cat:"Other", cal:496.6502999999999, pro:25.42, carb:39.18, fat:26.903333333333336, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.5233333333333333, calc:890.2733333333332, zinc:2.7266666666666666, b12:0, vitD:0, omega3:0, iod:323.2033333333333, sel:0, mag:77.42666666666666, pot:1131.6633333333334, fol:0},
{id:"taco_460", name:"Fermented milk", cat:"Other", cal:69.62147400000002, pro:1.89486, carb:15.67447333333333, fat:0.09900000000000002, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0, calc:71.528, zinc:0.26133333333333336, b12:0, vitD:0, omega3:0, iod:33.43066666666667, sel:0, mag:6.2316666666666665, pot:94.48333333333333, fol:0},
{id:"taco_461", name:"Minas cheese, fresh cheese", cat:"Other", cal:264.27312799999993, pro:17.411020000000004, carb:3.240313333333333, fat:20.180666666666667, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.931, calc:579.2533333333334, zinc:0.29233333333333333, b12:0, vitD:0, omega3:0, iod:31.226333333333333, sel:0, mag:6.883666666666667, pot:104.84666666666665, fol:0},
{id:"taco_462", name:"Minas cheese, semi-cured", cat:"Other", cal:320.72181773325985, pro:21.21137371381124, carb:3.5729596195220865, fat:24.61, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.219, calc:695.9173333333333, zinc:2.6820000000000004, b12:0, vitD:0, omega3:0, iod:501.1656666666666, sel:0, mag:27.072666666666667, pot:119.97733333333332, fol:0},
{id:"taco_463", name:"Cheese, mozzarella", cat:"Other", cal:329.8707184208871, pro:22.64900040626526, carb:3.0493329270680736, fat:25.183000000000003, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.306, calc:875.0393333333333, zinc:3.5220000000000002, b12:0, vitD:0, omega3:0, iod:581.357, sel:0, mag:23.573666666666668, pot:61.89433333333333, fol:0},
{id:"taco_464", name:"Parmesan cheese", cat:"Other", cal:452.9637553333333, pro:35.55361333333333, carb:1.6607199999999995, fat:33.529333333333334, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.5323333333333333, calc:991.9676666666668, zinc:4.358666666666667, b12:0, vitD:0, omega3:0, iod:1844.0810000000001, sel:0, mag:33.367333333333335, pot:96.23700000000001, fol:0},
{id:"taco_465", name:"Cheese, pasteurized", cat:"Other", cal:303.07980333333325, pro:9.357333333333333, carb:5.67633333333333, fat:27.435333333333332, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.26533333333333337, calc:323.2993333333333, zinc:1.3046666666666669, b12:0, vitD:0, omega3:0, iod:780.426, sel:0, mag:16.00166666666667, pot:193.721, fol:0},
{id:"taco_466", name:"Cheese, petit suisse, strawberry", cat:"Other", cal:121.105954, pro:5.78666, carb:18.46200666666666, fat:2.8383333333333334, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.14100000000000001, calc:730.9326666666666, zinc:2.6633333333333336, b12:0, vitD:0, omega3:0, iod:412.46900000000005, sel:0, mag:26.508666666666667, pot:121.46166666666666, fol:0},
{id:"taco_467", name:"Cheese, dish", cat:"Other", cal:359.88046240505474, pro:22.661760406494142, carb:1.8785729268391926, fat:29.106333333333335, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.28, calc:939.9933333333333, zinc:3.4616666666666664, b12:0, vitD:0, omega3:0, iod:579.774, sel:0, mag:28.273666666666667, pot:73.47166666666666, fol:0},
{id:"taco_468", name:"Cheese, cream cheese, creamy", cat:"Other", cal:256.57814866666666, pro:9.629546666666666, carb:2.4324533333333336, fat:23.441000000000003, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.115, calc:259.46666666666664, zinc:1.277, b12:0, vitD:0, omega3:0, iod:557.9246666666667, sel:0, mag:11.628333333333332, pot:93.06433333333332, fol:0},
{id:"taco_469", name:"Cheese, ricotta", cat:"Other", cal:139.73177999999996, pro:12.6005, carb:3.7861666666666673, fat:8.108666666666666, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.1366666666666667, calc:253.236, zinc:0.4603333333333333, b12:0, vitD:0, omega3:0, iod:282.579, sel:0, mag:11.808666666666667, pot:112.37833333333333, fol:0},
{id:"taco_470", name:"Isotonic drink, various flavors.", cat:"Other", cal:25.613333333333344, pro:0.0, carb:6.4033333333333395, fat:0.0, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.67, calc:1.2333333333333334, zinc:0, b12:0, vitD:0, omega3:0, iod:44.083333333333336, sel:0, mag:0, pot:13.026666666666666, fol:0},
{id:"taco_471", name:"Coffee, 10% infusion", cat:"Other", cal:9.070868599613517, pro:0.7125, carb:1.478666666666667, fat:0.06933333333333334, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0, calc:3.159333333333333, zinc:0, b12:0, vitD:0, omega3:0, iod:1.0273333333333334, sel:0, mag:9.661666666666667, pot:155.70400000000004, fol:0},
{id:"taco_472", name:"Sugarcane, brandy 1", cat:"Other", cal:215.6616, pro:0, carb:0, fat:0, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0, calc:0, zinc:0, b12:0, vitD:0, omega3:0, iod:3.145666666666667, sel:0, mag:0, pot:0, fol:0},
{id:"taco_473", name:"Sugarcane, juice of", cat:"Other", cal:65.34359826898573, pro:0, carb:18.151000000000003, fat:0, fib:0.13633333333333333, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.7526666666666667, calc:9.083, zinc:0.050666666666666665, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:11.973999999999998, pot:17.973, fol:0},
{id:"taco_474", name:"Beer, pilsner 2", cat:"Other", cal:40.72018855062866, pro:0.5625, carb:3.3175, fat:0, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0, calc:4.985, zinc:0, b12:0, vitD:0, omega3:0, iod:4.230333333333333, sel:0, mag:6.743666666666666, pot:29.46666666666667, fol:0},
{id:"taco_475", name:"Tea, fennel, infusion 5%", cat:"Other", cal:1.3970599738756386, pro:0.0, carb:0.3913333333333213, fat:0.0, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0, calc:1.931, zinc:0, b12:0, vitD:0, omega3:0, iod:0.6253333333333334, sel:0, mag:0.8809999999999999, pot:9.929, fol:0},
{id:"taco_476", name:"Tea, mate, infusion 5%", cat:"Other", cal:2.730749951124143, pro:0.0, carb:0.6429999999999931, fat:0.052, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0, calc:0.6446666666666666, zinc:0, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:2.037, pot:5.336333333333333, fol:0},
{id:"taco_477", name:"Tea, black, infusion 5%", cat:"Other", cal:2.24790995796521, pro:0.0, carb:0.6296666666666653, fat:0.0, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0, calc:0.25233333333333335, zinc:0, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:0.956, pot:13.437666666666665, fol:0},
{id:"taco_478", name:"Coconut water", cat:"Other", cal:21.50859424050649, pro:0.0, carb:5.284666666666672, fat:0.0, fib:0.13033333333333333, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0, calc:18.837333333333333, zinc:0, b12:0, vitD:0, omega3:0, iod:1.782333333333333, sel:0, mag:5.158333333333334, pot:161.65099999999998, fol:0},
{id:"taco_479", name:"Soft drink, tonic water type.", cat:"Other", cal:30.7794, pro:0.0, carb:7.953333333333339, fat:0.0, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0, calc:1.0753333333333335, zinc:0, b12:0, vitD:0, omega3:0, iod:8.290333333333333, sel:0, mag:0, pot:1.5056666666666667, fol:0},
{id:"taco_480", name:"Refrigerant, cola type", cat:"Other", cal:33.514200000000045, pro:0.0, carb:8.66000000000001, fat:0.0, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0, calc:1.3723333333333334, zinc:0, b12:0, vitD:0, omega3:0, iod:7.119333333333333, sel:0, mag:0, pot:0.905, fol:0},
{id:"taco_481", name:"Soft drink, guarana type.", cat:"Other", cal:38.7, pro:0.0, carb:10.0, fat:0.0, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0, calc:1.4076666666666666, zinc:0, b12:0, vitD:0, omega3:0, iod:9.009666666666666, sel:0, mag:0, pot:1.3813333333333333, fol:0},
{id:"taco_482", name:"Orange-flavored soft drink", cat:"Other", cal:45.62730000000003, pro:0.0, carb:11.79, fat:0.0, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0, calc:2.344333333333333, zinc:0, b12:0, vitD:0, omega3:0, iod:9.271666666666667, sel:0, mag:1.2076666666666667, pot:15.504333333333335, fol:0},
{id:"taco_483", name:"Lemon-flavored soft drink", cat:"Other", cal:39.71910000000001, pro:0.0, carb:10.263333333333335, fat:0.0, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0, calc:1.7506666666666666, zinc:0, b12:0, vitD:0, omega3:0, iod:8.803333333333335, sel:0, mag:0.531, pot:4.269, fol:0},
{id:"taco_484", name:"Cheese omelet", cat:"Other", cal:268.00677218242487, pro:15.570833333333333, carb:0.43716666666666804, fat:22.007666666666665, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:1.3696666666666666, calc:165.72733333333335, zinc:1.3606666666666667, b12:0, vitD:0, omega3:0, iod:216.05100000000002, sel:0, mag:14.267666666666669, pot:126.931, fol:0},
{id:"taco_485", name:"Whole, raw quail egg", cat:"Other", cal:176.89389999999997, pro:13.6875, carb:0.7724999999999986, fat:12.68, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:3.3486666666666665, calc:78.72933333333333, zinc:2.054333333333333, b12:0, vitD:0, omega3:0, iod:128.987, sel:0, mag:11.063, pot:78.72933333333333, fol:0},
{id:"taco_486", name:"Egg, chicken, white, boiled/10 minutes", cat:"Other", cal:59.43569666666667, pro:13.447916666666668, carb:0.0, fat:0.08900000000000001, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.07866666666666666, calc:6.231999999999999, zinc:0, b12:0, vitD:0, omega3:0, iod:180.5376666666667, sel:0, mag:11.007, pot:145.87033333333332, fol:0},
{id:"taco_487", name:"Egg, chicken, yolk, boiled/10 minutes", cat:"Other", cal:352.67334000000005, pro:15.9, carb:1.5600000000000065, fat:30.777, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:2.9233333333333333, calc:114.431, zinc:2.8736666666666664, b12:0, vitD:0, omega3:0, iod:44.90866666666667, sel:0, mag:9.367333333333333, pot:87.37733333333334, fol:0},
{id:"taco_488", name:"Whole chicken egg, boiled for 10 minutes.", cat:"Other", cal:145.70017, pro:13.29375, carb:0.6149166666666736, fat:9.476333333333333, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:1.5153333333333332, calc:49.218333333333334, zinc:1.236, b12:0, vitD:0, omega3:0, iod:145.90099999999998, sel:0, mag:11.244333333333335, pot:138.897, fol:0},
{id:"taco_489", name:"Whole, raw chicken egg.", cat:"Other", cal:143.11173333333335, pro:13.03, carb:1.6366666666666725, fat:8.9, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:1.5633333333333335, calc:42.02333333333333, zinc:1.0833333333333333, b12:0, vitD:0, omega3:0, iod:167.91, sel:0, mag:12.66, pot:150.0, fol:0},
{id:"taco_490", name:"Whole fried chicken egg", cat:"Other", cal:240.1872240091165, pro:15.616666666666667, carb:1.1936666666666627, fat:18.592666666666666, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:2.0966666666666667, calc:72.88733333333333, zinc:1.4613333333333334, b12:0, vitD:0, omega3:0, iod:166.11233333333334, sel:0, mag:16.250333333333334, pot:184.00700000000003, fol:0},
{id:"taco_491", name:"Chocolate powder", cat:"Other", cal:401.02, pro:4.203333333333333, carb:91.17666666666666, fat:2.1666666666666665, fib:3.89, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:5.36, calc:44.40333333333333, zinc:1.04, b12:0, vitD:0, omega3:0, iod:64.78666666666668, sel:0, mag:76.74333333333334, pot:496.45, fol:0},
{id:"taco_492", name:"Sugar, crystal", cat:"Other", cal:386.84572399999996, pro:0.32, carb:99.61, fat:0, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.16333333333333333, calc:7.586666666666667, zinc:0, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:1.0066666666666668, pot:2.56, fol:0},
{id:"taco_493", name:"Brown sugar", cat:"Other", cal:368.55482252438867, pro:0.7583333333333333, carb:94.45, fat:0.09200000000000001, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:8.303666666666667, calc:126.529, zinc:0.47766666666666663, b12:0, vitD:0, omega3:0, iod:25.203999999999997, sel:0, mag:79.94666666666667, pot:521.6266666666667, fol:0},
{id:"taco_494", name:"Refined sugar", cat:"Other", cal:386.5748239999999, pro:0.32, carb:99.54, fat:0, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.10666666666666667, calc:3.5, zinc:0, b12:0, vitD:0, omega3:0, iod:12.16, sel:0, mag:0.5466666666666667, pot:6.353333333333334, fol:0},
{id:"taco_495", name:"Milk chocolate", cat:"Other", cal:539.5866666666667, pro:7.22, carb:59.576666666666675, fat:30.26666666666667, fib:2.17, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:1.5766666666666669, calc:191.19, zinc:1.0633333333333332, b12:0, vitD:0, omega3:0, iod:77.1, sel:0, mag:57.1, pot:354.5133333333333, fol:0},
{id:"taco_496", name:"Milk chocolate with Brazil nuts", cat:"Other", cal:558.8763333333334, pro:7.4125, carb:55.37683333333334, fat:34.191, fib:2.458, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:1.471, calc:171.23266666666666, zinc:1.304, b12:0, vitD:0, omega3:0, iod:64.05, sel:0, mag:79.566, pot:430.9156666666666, fol:0},
{id:"taco_497", name:"Milk chocolate, diet.", cat:"Other", cal:556.8243333333334, pro:6.897916666666666, carb:56.32341666666667, fat:33.771, fib:2.8466666666666662, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:3.310666666666666, calc:187.88566666666665, zinc:1.1156666666666668, b12:0, vitD:0, omega3:0, iod:84.70833333333333, sel:0, mag:67.20633333333332, pot:458.40166666666664, fol:0},
{id:"taco_498", name:"Semi-sweet chocolate", cat:"Other", cal:474.91776997327383, pro:4.862443432172139, carb:62.42288990116119, fat:29.856666666666666, fib:4.943666666666666, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:3.610666666666667, calc:44.66533333333333, zinc:1.5213333333333334, b12:0, vitD:0, omega3:0, iod:8.866999999999999, sel:0, mag:107.36366666666667, pot:431.6956666666667, fol:0},
{id:"taco_499", name:"white coconut candy", cat:"Other", cal:448.84545242331023, pro:1.1218333737055461, carb:81.38316662629445, fat:13.586999999999998, fib:3.5690000000000004, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:1.243, calc:7.057333333333333, zinc:0.412, b12:0, vitD:0, omega3:0, iod:28.992333333333335, sel:0, mag:17.408666666666665, pot:183.073, fol:0},
{id:"taco_500", name:"Sweet, pumpkin, creamy", cat:"Other", cal:198.9360630496343, pro:0.9166666666666666, carb:54.61333333333334, fat:0.20666666666666667, fib:2.28, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.8533333333333332, calc:12.986666666666666, zinc:0, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:5.521000000000001, pot:136.74633333333333, fol:0},
{id:"taco_501", name:"Sweet, milky, creamy", cat:"Other", cal:306.31013023105874, pro:5.478293431599935, carb:59.49337323506673, fat:5.992999999999999, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.06566666666666666, calc:195.10066666666668, zinc:0.5253333333333333, b12:0, vitD:0, omega3:0, iod:120.08866666666667, sel:0, mag:16.262, pot:259.464, fol:0},
{id:"taco_502", name:"Jelly, tripe stew, natural", cat:"Other", cal:106.08666666666662, pro:2.125, carb:24.231666666666662, fat:0.07333333333333332, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.11633333333333333, calc:3.5233333333333334, zinc:0, b12:0, vitD:0, omega3:0, iod:42.68033333333333, sel:0, mag:0.7463333333333333, pot:2.005, fol:0},
{id:"taco_503", name:"Corn glucose", cat:"Other", cal:292.1184052991867, pro:0.0, carb:79.38, fat:0.0, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.051333333333333335, calc:5.665333333333334, zinc:0, b12:0, vitD:0, omega3:0, iod:58.92966666666666, sel:0, mag:1.8953333333333333, pot:5.056333333333333, fol:0},
{id:"taco_504", name:"Maria mole", cat:"Other", cal:301.2358875369997, pro:3.8128501310348506, carb:73.55348320229848, fat:0.19, fib:0.6666666666666666, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.3946666666666667, calc:13.357666666666667, zinc:0.08533333333333333, b12:0, vitD:0, omega3:0, iod:15.309333333333333, sel:0, mag:6.886666666666667, pot:23.55933333333333, fol:0},
{id:"taco_505", name:"Maria mole, burnt coconut", cat:"Other", cal:306.6318969970185, pro:3.9349501352310177, carb:75.05938319810231, fat:0.08933333333333333, fib:0.6366666666666667, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.4713333333333333, calc:19.456333333333333, zinc:0.09466666666666668, b12:0, vitD:0, omega3:0, iod:14.287333333333335, sel:0, mag:5.987666666666666, pot:35.958999999999996, fol:0},
{id:"taco_506", name:"Marmalade", cat:"Other", cal:257.24147319380444, pro:0.4, carb:70.76333333333334, fat:0.13733333333333334, fib:4.07, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.729, calc:11.324666666666667, zinc:0.07766666666666666, b12:0, vitD:0, omega3:0, iod:10.883666666666668, sel:0, mag:5.803333333333332, pot:83.14666666666666, fol:0},
{id:"taco_507", name:"Honey, from bees", cat:"Other", cal:309.24266666666665, pro:0.0, carb:84.03333333333333, fat:0.0, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.25066666666666665, calc:10.204333333333333, zinc:0.17233333333333334, b12:0, vitD:0, omega3:0, iod:6.04, sel:0, mag:5.511333333333333, pot:99.32166666666666, fol:0},
{id:"taco_508", name:"Molasses", cat:"Other", cal:296.5064912319183, pro:0.0, carb:76.61666666666666, fat:0.0, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:5.391666666666667, calc:102.06333333333333, zinc:0.2733333333333334, b12:0, vitD:0, omega3:0, iod:4.01, sel:0, mag:115.13666666666666, pot:395.06, fol:0},
{id:"taco_509", name:"Custard", cat:"Other", cal:411.3487215708494, pro:4.7375, carb:46.298833333333334, fat:24.425, fib:3.223333333333333, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:1.3816666666666666, calc:37.17866666666667, zinc:1.109, b12:0, vitD:0, omega3:0, iod:27.366, sel:0, mag:14.903999999999998, pot:111.00466666666667, fol:0},
{id:"taco_510", name:"Brown sugar", cat:"Other", cal:351.9581221015453, pro:0.9895833333333333, carb:90.79241666666667, fat:0.07066666666666667, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:4.441333333333333, calc:30.486333333333334, zinc:0.5623333333333334, b12:0, vitD:0, omega3:0, iod:21.71066666666667, sel:0, mag:47.18033333333333, pot:458.874, fol:0},
{id:"taco_511", name:"Coffee, ground, roasted", cat:"Other", cal:418.6186666666666, pro:14.7, carb:65.75333333333332, fat:11.946666666666667, fib:51.22666666666667, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:8.133333333333333, calc:106.89333333333333, zinc:0.5233333333333333, b12:0, vitD:0, omega3:0, iod:1.1333333333333335, sel:0, mag:165.12, pot:1608.58, fol:0},
{id:"taco_512", name:"Cappuccino powder", cat:"Other", cal:417.4066666666667, pro:11.3125, carb:73.61416666666665, fat:8.633333333333333, fib:2.4433333333333334, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:2.2756666666666665, calc:466.5906666666667, zinc:1.1446666666666667, b12:0, vitD:0, omega3:0, iod:382.2866666666667, sel:0, mag:70.84966666666666, pot:885.7956666666668, fol:0},
{id:"taco_513", name:"Baking powder, chemical", cat:"Other", cal:89.72206665112176, pro:0.4753333187103272, carb:43.91133334795634, fat:0.07333333333333333, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0, calc:0, zinc:0, b12:0, vitD:0, omega3:0, iod:10052.411333333333, sel:0, mag:0, pot:0, fol:0},
{id:"taco_514", name:"Yeast, biological, yeast tablet", cat:"Other", cal:89.79486703058885, pro:16.956999478340148, carb:7.698667188326523, fat:1.5176666666666667, fib:4.165666666666667, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:2.6180000000000003, calc:18.008666666666667, zinc:10.999666666666668, b12:0, vitD:0, omega3:0, iod:39.61066666666667, sel:0, mag:38.44866666666667, pot:576.2443333333333, fol:0},
{id:"taco_515", name:"Gelatin, various flavors, powder", cat:"Other", cal:380.22290000000004, pro:8.886666666666667, carb:89.22333333333333, fat:0, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.3333333333333333, calc:26.83666666666667, zinc:0, b12:0, vitD:0, omega3:0, iod:234.92333333333332, sel:0, mag:2.3066666666666666, pot:7.25, fol:0},
{id:"taco_516", name:"Dietary salt", cat:"Other", cal:0, pro:0, carb:0, fat:0, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0, calc:0, zinc:0, b12:0, vitD:0, omega3:0, iod:23431.521666666667, sel:0, mag:0, pot:20467.637, fol:0},
{id:"taco_517", name:"Sal, grosso", cat:"Other", cal:0, pro:0, carb:0, fat:0, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0, calc:0, zinc:0, b12:0, vitD:0, omega3:0, iod:39943.203, sel:0, mag:0, pot:0, fol:0},
{id:"taco_518", name:"Shoyu", cat:"Other", cal:60.92774987538659, pro:3.3125, carb:11.6475, fat:0.32666666666666666, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.49866666666666665, calc:14.527999999999999, zinc:0.18600000000000003, b12:0, vitD:0, omega3:0, iod:5024.208333333333, sel:0, mag:23.627, pot:165.17733333333334, fol:0},
{id:"taco_519", name:"Salt-based seasoning", cat:"Other", cal:21.33, pro:2.666666666666667, carb:2.0733333333333377, fat:0.26333333333333336, fib:0.5566666666666668, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0, calc:0, zinc:0, b12:0, vitD:0, omega3:0, iod:32560.0, sel:0, mag:0, pot:0, fol:0},
{id:"taco_520", name:"Black olives, preserved", cat:"Other", cal:194.1538470209837, pro:1.1625, carb:5.544500000000004, fat:20.345, fib:4.555, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:5.45, calc:58.75066666666666, zinc:0.29396666666666665, b12:0, vitD:0, omega3:0, iod:1566.661, sel:0, mag:4.762, pot:78.572, fol:0},
{id:"taco_521", name:"Green preserved olives", cat:"Other", cal:136.93643000000003, pro:0.9479166666666665, carb:4.101750000000001, fat:14.215666666666666, fib:3.845666666666667, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.17633333333333331, calc:45.63933333333333, zinc:0.07733333333333332, b12:0, vitD:0, omega3:0, iod:1347.1776666666667, sel:0, mag:3.936666666666667, pot:19.805333333333333, fol:0},
{id:"taco_522", name:"Chantilly cream spray with vegetable fat.", cat:"Other", cal:314.9560002666667, pro:0.525, carb:16.85500006666667, fat:27.270666666666667, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0, calc:2.2743333333333333, zinc:0.07400000000000001, b12:0, vitD:0, omega3:0, iod:109.70366666666666, sel:0, mag:0.8463333333333334, pot:5.1113333333333335, fol:0},
{id:"taco_523", name:"Coconut milk", cat:"Other", cal:166.16030161554647, pro:1.0140667031606039, carb:2.1945999635060494, fat:18.364333333333335, fib:0.6836666666666668, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.45566666666666666, calc:5.8503333333333325, zinc:0.3156666666666667, b12:0, vitD:0, omega3:0, iod:44.294666666666664, sel:0, mag:16.825333333333333, pot:143.673, fol:0},
{id:"taco_524", name:"Mayonnaise, traditional with eggs", cat:"Other", cal:302.1526776878237, pro:0.58125, carb:7.899749999999999, fat:30.497666666666664, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.09700000000000002, calc:3.4783333333333335, zinc:0.06, b12:0, vitD:0, omega3:0, iod:786.8273333333333, sel:0, mag:0.8553333333333333, pot:16.088, fol:0},
{id:"taco_525", name:"Shrimp bean ball", cat:"Other", cal:289.21166666666664, pro:8.345833333333335, carb:19.113833333333332, fat:19.930333333333333, fib:9.358333333333333, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:1.9329999999999998, calc:124.41933333333333, zinc:1.1936666666666667, b12:0, vitD:0, omega3:0, iod:304.88866666666667, sel:0, mag:51.12433333333333, pot:353.6603333333333, fol:0},
{id:"taco_526", name:"Carreteiro rice", cat:"Other", cal:153.772, pro:10.829166666666667, carb:11.584833333333329, fat:7.124, fib:1.501666666666667, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.955, calc:13.256, zinc:2.670666666666667, b12:0, vitD:0, omega3:0, iod:1621.728, sel:0, mag:9.290666666666667, pot:87.15, fol:0},
{id:"taco_527", name:"Baião de dois, rice and string beans", cat:"Other", cal:135.68133333333333, pro:6.239583333333332, carb:20.41775, fat:3.2279999999999998, fib:5.069, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.5623333333333332, calc:33.29666666666667, zinc:0.599, b12:0, vitD:0, omega3:0, iod:93.29966666666667, sel:0, mag:18.677666666666667, pot:157.30866666666668, fol:0},
{id:"taco_528", name:"Barreado", cat:"Other", cal:164.9752340474129, pro:18.26875, carb:0.23625, fat:9.534, fib:0.1466666666666667, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:2.4439999999999995, calc:14.512333333333336, zinc:4.825666666666667, b12:0, vitD:0, omega3:0, iod:47.62733333333333, sel:0, mag:21.371333333333336, pot:294.5563333333333, fol:0},
{id:"taco_529", name:"Steak with fried egg, with sirloin steak", cat:"Other", cal:291.2295092449586, pro:23.660416666666663, carb:0.0, fat:21.146666666666665, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:2.1033333333333335, calc:25.979333333333333, zinc:3.2086666666666663, b12:0, vitD:0, omega3:0, iod:82.87466666666667, sel:0, mag:19.487333333333332, pot:272.23333333333335, fol:0},
{id:"taco_530", name:"Rice cake", cat:"Other", cal:273.51433333333335, pro:8.039583333333333, carb:41.682750000000006, fat:8.291666666666666, fib:2.7373333333333334, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:2.122666666666667, calc:23.569666666666667, zinc:0.8603333333333333, b12:0, vitD:0, omega3:0, iod:58.85733333333334, sel:0, mag:13.452666666666667, pot:96.45366666666666, fol:0},
{id:"taco_531", name:"Shrimp Bahian style", cat:"Other", cal:100.78304300403595, pro:7.941666666666666, carb:3.1736666666666653, fat:5.967666666666667, fib:0.3866666666666667, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:1.418, calc:42.68066666666667, zinc:0.4686666666666666, b12:0, vitD:0, omega3:0, iod:84.78666666666668, sel:0, mag:14.863999999999999, pot:139.138, fol:0},
{id:"taco_532", name:"Cabbage roll", cat:"Other", cal:78.23472922221822, pro:6.779166666666665, carb:10.133166666666673, fat:1.1166666666666667, fib:1.46, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.8620000000000001, calc:22.887333333333334, zinc:1.7503333333333335, b12:0, vitD:0, omega3:0, iod:12.100666666666667, sel:0, mag:13.459666666666669, pot:184.03366666666668, fol:0},
{id:"taco_533", name:"Corn couscous, cooked with salt.", cat:"Other", cal:113.45948166666666, pro:2.15625, carb:25.281416666666665, fat:0.6796666666666665, fib:2.0533333333333332, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.17333333333333334, calc:1.5406666666666666, zinc:0.20200000000000004, b12:0, vitD:0, omega3:0, iod:247.66599999999997, sel:0, mag:2.718, pot:10.853666666666667, fol:0},
{id:"taco_534", name:"Couscous, from São Paulo", cat:"Other", cal:142.123, pro:2.558333333333333, carb:22.513666666666666, fat:4.648333333333333, fib:2.4326666666666665, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.33, calc:14.161333333333333, zinc:0.21, b12:0, vitD:0, omega3:0, iod:235.70966666666666, sel:0, mag:5.096, pot:52.93266666666667, fol:0},
{id:"taco_535", name:"Cuxá, sauce", cat:"Other", cal:80.09161563650767, pro:5.64375, carb:5.7389166666666656, fat:3.5926666666666667, fib:3.016666666666667, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.944, calc:105.48066666666666, zinc:0.5706666666666665, b12:0, vitD:0, omega3:0, iod:1344.2946666666667, sel:0, mag:33.57933333333333, pot:124.05633333333333, fol:0},
{id:"taco_536", name:"Tripe", cat:"Other", cal:124.50020083333331, pro:19.772916666666664, carb:0.0, fat:4.442333333333333, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:1.01, calc:11.336666666666666, zinc:2.7206666666666663, b12:0, vitD:0, omega3:0, iod:28.773666666666667, sel:0, mag:8.250333333333332, pot:57.577333333333335, fol:0},
{id:"taco_537", name:"Beef Stroganoff", cat:"Other", cal:173.1413643180132, pro:15.03125, carb:2.975416666666672, fat:10.802999999999999, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:2.699333333333333, calc:28.317999999999998, zinc:2.0413333333333337, b12:0, vitD:0, omega3:0, iod:122.848, sel:0, mag:21.511666666666667, pot:322.3136666666667, fol:0},
{id:"taco_538", name:"Chicken Stroganoff", cat:"Other", cal:156.80610301323728, pro:17.552083333333336, carb:2.593916666666657, fat:7.9623333333333335, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:1.5213333333333334, calc:26.049333333333333, zinc:0.5833333333333333, b12:0, vitD:0, omega3:0, iod:99.455, sel:0, mag:24.76433333333333, pot:307.08633333333336, fol:0},
{id:"taco_539", name:"Minas Gerais-style tropeiro beans", cat:"Other", cal:151.56185683095453, pro:10.170833333333333, carb:19.58183333333333, fat:6.790666666666667, fib:3.5733333333333337, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:2.162333333333333, calc:41.19566666666666, zinc:1.4463333333333335, b12:0, vitD:0, omega3:0, iod:365.0743333333333, sel:0, mag:36.10533333333333, pot:348.9293333333333, fol:0},
{id:"taco_540", name:"L", cat:"Other", cal:116.9334573110342, pro:8.670833333333333, carb:11.641833333333333, fat:6.477333333333334, fib:5.09, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:1.3470000000000002, calc:32.38166666666667, zinc:0.8316666666666667, b12:0, vitD:0, omega3:0, iod:278.2203333333333, sel:0, mag:31.849666666666668, pot:303.493, fol:0},
{id:"taco_541", name:"Chicken with saffron", cat:"Other", cal:112.78376884122686, pro:9.697916666666666, carb:4.062083333333325, fat:6.17, fib:0.22333333333333336, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.838, calc:12.988333333333335, zinc:0.503, b12:0, vitD:0, omega3:0, iod:28.812, sel:0, mag:16.087666666666667, pot:256.37466666666666, fol:0},
{id:"taco_542", name:"Pasta with Bolognese sauce", cat:"Grains", cal:119.53177144556008, pro:4.934299834887187, carb:22.522366831779475, fat:0.8896666666666667, fib:0.7766666666666667, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:1.389, calc:10.548333333333334, zinc:0.7520000000000001, b12:0, vitD:0, omega3:0, iod:8.939333333333334, sel:0, mag:9.981333333333334, pot:83.57366666666667, fol:0},
{id:"taco_543", name:"Maniçoba", cat:"Other", cal:134.22289340098695, pro:9.958333333333332, carb:3.419333333333327, fat:8.699333333333334, fib:2.16, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:3.215333333333333, calc:65.98066666666666, zinc:2.025333333333333, b12:0, vitD:0, omega3:0, iod:406.70433333333335, sel:0, mag:23.65233333333333, pot:147.71266666666665, fol:0},
{id:"taco_544", name:"Quibebe", cat:"Other", cal:86.349230299592, pro:8.55625, carb:6.644083333333324, fat:2.672, fib:1.6666666666666667, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.7783333333333333, calc:7.684666666666668, zinc:1.6366666666666667, b12:0, vitD:0, omega3:0, iod:246.614, sel:0, mag:10.395, pot:152.81266666666667, fol:0},
{id:"taco_545", name:"Vegetable salad with mayonnaise.", cat:"Other", cal:96.10358839845655, pro:1.05, carb:8.923999999999994, fat:7.039000000000001, fib:2.216666666666667, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.229, calc:12.128333333333332, zinc:0.15633333333333332, b12:0, vitD:0, omega3:0, iod:228.42566666666667, sel:0, mag:8.714333333333334, pot:141.29433333333333, fol:0},
{id:"taco_546", name:"Steamed vegetable salad", cat:"Other", cal:35.40810429847241, pro:2.00625, carb:7.089083333333335, fat:0.3116666666666667, fib:2.513333333, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.4406666666666667, calc:32.895, zinc:0.3, b12:0, vitD:0, omega3:0, iod:2.5096666666666665, sel:0, mag:18.578333333333337, pot:244.30366666666666, fol:0},
{id:"taco_547", name:"Chicken salad", cat:"Other", cal:147.8645961340268, pro:13.925, carb:4.568999999999992, fat:7.8406666666666665, fib:0.41, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.31833333333333336, calc:9.408999999999999, zinc:0.39266666666666666, b12:0, vitD:0, omega3:0, iod:248.3456666666667, sel:0, mag:13.254, pot:148.968, fol:0},
{id:"taco_548", name:"Sarapatel", cat:"Other", cal:122.98185821243132, pro:18.47291666666667, carb:1.09408333333334, fat:4.42, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:7.176333333333333, calc:12.234333333333334, zinc:1.7703333333333333, b12:0, vitD:0, omega3:0, iod:215.62266666666667, sel:0, mag:12.796999999999999, pot:198.75699999999998, fol:0},
{id:"taco_549", name:"Sheet", cat:"Other", cal:57.45347668848058, pro:2.046329973220825, carb:10.581003360112511, fat:1.208, fib:2.0833333333333335, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.5513333333333333, calc:18.847333333333335, zinc:0.578, b12:0, vitD:0, omega3:0, iod:1.192, sel:0, mag:17.977333333333334, pot:187.62666666666667, fol:0},
{id:"taco_550", name:"Tacacá", cat:"Other", cal:46.88917715120316, pro:6.958333333333335, carb:3.39, fat:0.35966666666666663, fib:0.21333333333333335, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.9493333333333333, calc:44.81866666666667, zinc:0.794, b12:0, vitD:0, omega3:0, iod:1349.0626666666667, sel:0, mag:29.899, pot:240.1833333333333, fol:0},
{id:"taco_551", name:"Tapioca with butter", cat:"Other", cal:347.8265562578241, pro:0.08958333333333332, carb:63.59175, fat:10.908333333333333, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.24, calc:30.025333333333336, zinc:0.038, b12:0, vitD:0, omega3:0, iod:157.52433333333335, sel:0, mag:3.218, pot:19.305, fol:0},
{id:"taco_552", name:"Tucupi, with chili peppers", cat:"Other", cal:27.1837984027266, pro:2.05625, carb:4.737749999999988, fat:0.2836666666666667, fib:0.22666666666666668, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:1.1483333333333332, calc:28.256, zinc:0.8536666666666667, b12:0, vitD:0, omega3:0, iod:5.131, sel:0, mag:42.48566666666667, pot:390.83733333333333, fol:0},
{id:"taco_553", name:"Stuck cow", cat:"Other", cal:144.89697968479, pro:5.122916666666667, carb:10.061416666666673, fat:9.322000000000001, fib:2.3433333333333333, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.73, calc:62.659, zinc:1.196, b12:0, vitD:0, omega3:0, iod:25.633666666666667, sel:0, mag:15.754333333333333, pot:219.81133333333332, fol:0},
{id:"taco_554", name:"Vatapá", cat:"Other", cal:254.89328572415508, pro:5.99783354918162, carb:9.748499784151715, fat:23.226333333333333, fib:1.6966666666666665, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:1.4429999999999998, calc:46.81733333333333, zinc:0.8506666666666667, b12:0, vitD:0, omega3:0, iod:879.8506666666666, sel:0, mag:39.316333333333326, pot:209.405, fol:0},
{id:"taco_555", name:"Paulista-style turn", cat:"Other", cal:306.94678645131984, pro:10.18125, carb:14.10908333333333, fat:25.590666666666664, fib:2.1633333333333336, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:1.051, calc:40.70666666666667, zinc:1.0410000000000001, b12:0, vitD:0, omega3:0, iod:345.526, sel:0, mag:21.810333333333332, pot:237.26166666666666, fol:0},
{id:"taco_556", name:"Yakisoba", cat:"Other", cal:112.80204125340781, pro:7.5166666666666675, carb:18.251333333333335, fat:2.6069999999999998, fib:1.0566666666666666, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.6223333333333333, calc:13.946999999999997, zinc:0.6796666666666668, b12:0, vitD:0, omega3:0, iod:793.7620000000001, sel:0, mag:13.335, pot:158.57133333333334, fol:0},
{id:"taco_557", name:"Peanuts, whole, raw", cat:"Other", cal:544.0526557994334, pro:27.190800189971927, carb:20.313533333333336, fat:43.85, fib:8.036, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:2.532, calc:0, zinc:3.1673333333333336, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:170.511, pot:580.436, fol:0},
{id:"taco_558", name:"Roasted, salted peanuts", cat:"Other", cal:605.7810929170192, pro:22.475180157025655, carb:18.702486509641012, fat:53.96333333333334, fib:7.763333333333333, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:1.3326666666666667, calc:39.425666666666665, zinc:2.1159999999999997, b12:0, vitD:0, omega3:0, iod:375.7326666666666, sel:0, mag:159.33633333333333, pot:495.671, fol:0},
{id:"taco_559", name:"Pea, in pod", cat:"Other", cal:88.09358199977854, pro:7.4520833333333325, carb:14.227583333333328, fat:0.47100000000000003, fib:9.721, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:1.439, calc:24.443966666666668, zinc:1.23, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:41.75966666666667, pot:310.97633333333334, fol:0},
{id:"taco_560", name:"Canned, drained peas", cat:"Other", cal:73.8447043478261, pro:4.597826086956522, carb:13.44217391304348, fat:0.38, fib:5.08, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:1.3853333333333335, calc:22.215, zinc:0.8783333333333333, b12:0, vitD:0, omega3:0, iod:372.1096666666667, sel:0, mag:23.19033333333333, pot:147.12333333333333, fol:0},
{id:"taco_561", name:"Beans, carioca, cooked", cat:"Other", cal:76.42408566666668, pro:4.775, carb:13.591033333333334, fat:0.5423333333333334, fib:8.510333333333334, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:1.289, calc:26.594666666666665, zinc:0.7, b12:0, vitD:0, omega3:0, iod:1.7590000000000001, sel:0, mag:42.339666666666666, pot:254.61666666666667, fol:0},
{id:"taco_562", name:"Beans, carioca, raw", cat:"Other", cal:329.0267362318841, pro:19.981884057971016, carb:61.22144927536232, fat:1.2566666666666666, fib:18.42, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:7.986666666666667, calc:122.57, zinc:2.903333333333333, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:209.9466666666667, pot:1352.4566666666667, fol:0},
{id:"taco_563", name:"Black-eyed peas, cooked", cat:"Other", cal:78.00889666666667, pro:5.09375, carb:13.499583333333337, fat:0.644, fib:7.472, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:1.0596666666666665, calc:17.453333333333333, zinc:1.1153333333333335, b12:0, vitD:0, omega3:0, iod:0.9819999999999999, sel:0, mag:38.11833333333333, pot:252.97633333333332, fol:0},
{id:"taco_564", name:"Black-eyed peas, raw", cat:"Other", cal:339.16476666666665, pro:20.208333333333336, carb:61.24, fat:2.365, fib:23.593333333333334, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:5.128666666666667, calc:77.523, zinc:3.8826666666666667, b12:0, vitD:0, omega3:0, iod:10.313666666666668, sel:0, mag:178.39066666666668, pot:1082.7433333333333, fol:0},
{id:"taco_565", name:"Beans, jalo, cooked", cat:"Other", cal:92.73992, pro:6.14375, carb:16.495250000000002, fat:0.512, fib:13.866, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:1.921, calc:29.400666666666666, zinc:1.014, b12:0, vitD:0, omega3:0, iod:0.5203333333333333, sel:0, mag:44.104000000000006, pot:347.72066666666666, fol:0},
{id:"taco_566", name:"Beans, jalo, raw", cat:"Other", cal:327.90526666666665, pro:20.104166666666668, carb:61.47916666666666, fat:0.9466666666666667, fib:30.32, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:7.027666666666666, calc:97.97, zinc:3.0060000000000002, b12:0, vitD:0, omega3:0, iod:24.580333333333332, sel:0, mag:169.90300000000002, pot:1275.9513333333334, fol:0},
{id:"taco_567", name:"Black beans, cooked", cat:"Other", cal:77.02726666666668, pro:4.479166666666667, carb:14.00516666666666, fat:0.5356666666666666, fib:8.402333333333333, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:1.4656666666666667, calc:29.004333333333335, zinc:0.721, b12:0, vitD:0, omega3:0, iod:1.854, sel:0, mag:40.37133333333333, pot:256.37333333333333, fol:0},
{id:"taco_568", name:"Black beans, raw", cat:"Other", cal:323.5657115942029, pro:21.344202898550723, carb:58.75246376811595, fat:1.24, fib:21.833333333333332, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:6.463333333333334, calc:110.90333333333335, zinc:2.8533333333333335, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:188.10666666666665, pot:1415.68, fol:0},
{id:"taco_569", name:"Beans, speckled, cooked", cat:"Other", cal:84.7018527334929, pro:5.5375, carb:15.2675, fat:0.4, fib:9.318, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:1.3573333333333333, calc:29.189666666666668, zinc:0.919, b12:0, vitD:0, omega3:0, iod:0.6869999999999999, sel:0, mag:41.70733333333334, pot:314.584, fol:0},
{id:"taco_570", name:"Beans, speckled, raw", cat:"Other", cal:325.84441116273405, pro:17.270833333333332, carb:62.92916666666667, fat:1.17, fib:24.00666666666667, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:18.581666666666667, calc:111.42533333333334, zinc:2.5966666666666662, b12:0, vitD:0, omega3:0, iod:13.650333333333334, sel:0, mag:169.90033333333335, pot:1134.5416666666667, fol:0},
{id:"taco_571", name:"Beans, pink, cooked", cat:"Other", cal:67.86622877142827, pro:4.539583333333333, carb:11.822749999999997, fat:0.47733333333333333, fib:4.76, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:1.1843333333333332, calc:19.244, zinc:1.305, b12:0, vitD:0, omega3:0, iod:2.0806666666666667, sel:0, mag:42.95966666666667, pot:240.567, fol:0},
{id:"taco_572", name:"Beans, pink, raw", cat:"Other", cal:336.9619111275673, pro:20.916666666666668, carb:62.22333333333333, fat:1.33, fib:20.626666666666665, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:5.320333333333333, calc:67.66166666666666, zinc:3.978, b12:0, vitD:0, omega3:0, iod:24.11433333333333, sel:0, mag:184.49733333333333, pot:1108.6596666666667, fol:0},
{id:"taco_573", name:"Beans, purple, cooked", cat:"Other", cal:76.89338231790063, pro:5.720833333333334, carb:12.90816666666666, fat:0.5383333333333334, fib:11.514333333333335, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:1.4109999999999998, calc:22.532, zinc:1.006, b12:0, vitD:0, omega3:0, iod:1.457, sel:0, mag:34.39266666666666, pot:268.08633333333336, fol:0},
{id:"taco_574", name:"Beans, purple, raw", cat:"Other", cal:331.4149774567286, pro:22.166666666666668, carb:59.98666666666666, fat:1.2366666666666666, fib:33.843333333333334, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:6.9173333333333344, calc:120.45766666666667, zinc:3.2929999999999997, b12:0, vitD:0, omega3:0, iod:9.757666666666667, sel:0, mag:161.93533333333335, pot:1221.397, fol:0},
{id:"taco_575", name:"Raw chickpeas", cat:"Other", cal:354.70287658909956, pro:21.229166666666664, carb:57.88416666666667, fat:5.43, fib:12.356666666666667, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:5.377666666666666, calc:114.35933333333332, zinc:3.1910000000000003, b12:0, vitD:0, omega3:0, iod:5.194, sel:0, mag:146.38700000000003, pot:1115.7016666666668, fol:0},
{id:"taco_576", name:"Glove, raw", cat:"Other", cal:344.1336512849927, pro:18.964583333333334, carb:64.00041666666667, fat:2.132, fib:21.313666666666666, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:1.9433333333333334, calc:129.33766666666665, zinc:2.016666666666667, b12:0, vitD:0, omega3:0, iod:1.617, sel:0, mag:166.0, pot:1214.7976666666666, fol:0},
{id:"taco_577", name:"Lentils, cooked", cat:"Other", cal:92.63876625229915, pro:6.310416666666667, carb:16.30224999999999, fat:0.5246666666666667, fib:7.862333333333333, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:1.4793333333333336, calc:16.101, zinc:1.1306666666666667, b12:0, vitD:0, omega3:0, iod:1.1763333333333332, sel:0, mag:21.646, pot:219.90366666666668, fol:0},
{id:"taco_578", name:"Raw lentils", cat:"Other", cal:339.1412402035533, pro:23.152173913043477, carb:62.00449275362318, fat:0.77, fib:16.936666666666667, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:7.046666666666666, calc:53.52333333333333, zinc:3.4866666666666664, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:93.53, pot:886.8833333333332, fol:0},
{id:"taco_579", name:"Paçoca, peanuts", cat:"Other", cal:486.9270864645243, pro:15.995833333333334, carb:52.37616666666666, fat:26.075333333333333, fib:7.319, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:1.1346666666666667, calc:22.481333333333335, zinc:1.56, b12:0, vitD:0, omega3:0, iod:166.84066666666666, sel:0, mag:100.67466666666667, pot:347.60099999999994, fol:0},
{id:"taco_580", name:"Peanut brittle", cat:"Other", cal:503.1903658399557, pro:13.162240091959635, carb:54.73042657470704, fat:28.048333333333336, fib:3.393333333333333, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:1.2566666666666666, calc:27.108, zinc:1.431, b12:0, vitD:0, omega3:0, iod:16.345333333333333, sel:0, mag:107.90366666666667, pot:355.4146666666666, fol:0},
{id:"taco_581", name:"Soy flour", cat:"Other", cal:403.955845810399, pro:36.0301002407074, carb:38.43989975929261, fat:14.633333333333333, fib:20.18, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:13.055333333333335, calc:206.0203333333333, zinc:4.54, b12:0, vitD:0, omega3:0, iod:5.753666666666667, sel:0, mag:241.9, pot:1922.3916666666667, fol:0},
{id:"taco_582", name:"Soy, soluble extract, natural, fluid", cat:"Other", cal:39.10485527535076, pro:2.3810700159072873, carb:4.275263333333342, fat:1.606, fib:0.36633333333333334, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.434, calc:16.517, zinc:0.2776666666666667, b12:0, vitD:0, omega3:0, iod:56.528, sel:0, mag:15.454, pot:121.044, fol:0},
{id:"taco_583", name:"Soy, soluble extract, powder", cat:"Other", cal:458.8957294378677, pro:35.68750023841858, carb:28.482833333333335, fat:26.180999999999997, fib:7.313, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:7.009, calc:359.038, zinc:5.837666666666666, b12:0, vitD:0, omega3:0, iod:83.47099999999999, sel:0, mag:215.61566666666667, pot:1606.8006666666668, fol:0},
{id:"taco_584", name:"Soy, cheese (tofu)", cat:"Other", cal:64.48509407389021, pro:6.553176710446675, carb:2.126823333333333, fat:3.953333333333333, fib:0.7526666666666667, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:1.4303333333333335, calc:80.75733333333334, zinc:0.8933333333333332, b12:0, vitD:0, omega3:0, iod:1.2136666666666667, sel:0, mag:38.202, pot:181.691, fol:0},
{id:"taco_585", name:"Raw lupin beans", cat:"Other", cal:381.27817396012944, pro:33.575, carb:43.786333333333324, fat:10.341999999999999, fib:32.306999999999995, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:2.7886666666666664, calc:176.74533333333332, zinc:4.237666666666667, b12:0, vitD:0, omega3:0, iod:3.2906666666666666, sel:0, mag:121.43233333333335, pot:708.3209999999999, fol:0},
{id:"taco_586", name:"Canned lupin beans", cat:"Other", cal:120.64258534487091, pro:11.108333333333333, carb:12.38933333333334, fat:3.7840000000000003, fib:14.44, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.338, calc:15.537333333333331, zinc:0.6363333333333333, b12:0, vitD:0, omega3:0, iod:1808.7576666666666, sel:0, mag:3.517, pot:5.204666667, fol:0},
{id:"taco_587", name:"Roasted, salted almonds", cat:"Other", cal:580.7469545560705, pro:18.554759385108948, carb:29.547240000000002, fat:47.324333333333335, fib:11.64, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:3.0556666666666668, calc:236.70433333333335, zinc:2.5766666666666667, b12:0, vitD:0, omega3:0, iod:278.5226666666667, sel:0, mag:222.09900000000002, pot:639.602, fol:0},
{id:"taco_588", name:"Roasted, salted cashew nuts", cat:"Other", cal:570.167626501619, pro:18.50936733277639, carb:29.13496600055695, fat:46.279666666666664, fib:3.6630000000000003, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:5.221, calc:32.58766666666667, zinc:4.716666666666668, b12:0, vitD:0, omega3:0, iod:125.0, sel:0, mag:236.61, pot:671.4636666666667, fol:0},
{id:"taco_589", name:"Brazil nuts, raw", cat:"Other", cal:642.9630716810693, pro:14.536340101559956, carb:15.078659898440039, fat:63.459, fib:7.931, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:2.31, calc:146.33666666666667, zinc:4.219333333333334, b12:0, vitD:0, omega3:0, iod:0.6539999999999999, sel:0, mag:365.1233333333334, pot:650.994, fol:0},
{id:"taco_590", name:"Raw coconut", cat:"Other", cal:406.4873531078099, pro:3.69183412310697, carb:10.401665876893027, fat:41.976333333333336, fib:5.378166666666667, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:1.7583333333333333, calc:6.484500000000001, zinc:0.9433333333333334, b12:0, vitD:0, omega3:0, iod:15.32, sel:0, mag:51.4595, pot:354.1491666666667, fol:0},
{id:"taco_591", name:"Green, raw coconut", cat:"Other", cal:0, pro:0, carb:0, fat:0, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0, calc:0, zinc:0, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:0, pot:0, fol:0},
{id:"taco_592", name:"Flour, made from the mesocarp of the babassu palm, raw.", cat:"Other", cal:328.7714002448336, pro:1.4062667172749839, carb:79.17306661605835, fat:0.19800000000000004, fib:17.86, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:18.33366666666667, calc:60.952333333333335, zinc:0.3406666666666667, b12:0, vitD:0, omega3:0, iod:12.463000000000001, sel:0, mag:39.345666666666666, pot:362.07466666666664, fol:0},
{id:"taco_593", name:"Sesame, seed", cat:"Other", cal:583.5467147545495, pro:21.164667428334557, carb:21.617665904998766, fat:50.43266666666667, fib:11.868333333333334, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:5.447666667, calc:825.4463333, zinc:5.235, b12:0, vitD:0, omega3:0, iod:2.575, sel:0, mag:360.6886667, pot:546.286, fol:0},
{id:"taco_594", name:"Flaxseed", cat:"Other", cal:495.09611384365076, pro:14.083867173512777, carb:43.31219949315389, fat:32.25293333333334, fib:33.50266666666667, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:4.697, calc:211.49766666666665, zinc:4.388333333333334, b12:0, vitD:0, omega3:0, iod:8.673333333333334, sel:0, mag:346.92233333333337, pot:869.2869999999999, fol:0},
{id:"taco_595", name:"Pine nuts, cooked", cat:"Other", cal:174.36990200000002, pro:2.980366666666666, carb:43.917633333333335, fat:0.747, fib:15.6033333333333, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.7553333333333333, calc:15.767333333333333, zinc:0.827, b12:0, vitD:0, omega3:0, iod:0.8626666666666667, sel:0, mag:52.974333333333334, pot:727.0063333333333, fol:0},
{id:"taco_596", name:"cooked pupunha", cat:"Other", cal:218.53388087660073, pro:2.5229166666666667, carb:29.569416666666662, fat:12.761666666666668, fib:4.253333333333334, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.5186666666666667, calc:27.58633333333333, zinc:0.2916666666666667, b12:0, vitD:0, omega3:0, iod:0.9086666666666666, sel:0, mag:25.28933333333333, pot:303.35533333333336, fol:0},
{id:"taco_597", name:"Raw walnut", cat:"Other", cal:620.0600197905668, pro:13.9708005027771, carb:18.36386616388957, fat:59.35966666666667, fib:7.249666666666667, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:2.035, calc:105.30633333333333, zinc:2.0643333333333334, b12:0, vitD:0, omega3:0, iod:4.570666666666667, sel:0, mag:152.89066666666668, pot:533.255, fol:0},
{id:"taco_Legenda", name:"#VALUE!", cat:"Other", cal:0, pro:0, carb:0, fat:0, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0, calc:0, zinc:0, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:0, pot:0, fol:0},
{id:"taco_*", name:"The analyses are being re-evaluated.", cat:"Other", cal:0, pro:0, carb:0, fat:0, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0, calc:0, zinc:0, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:0, pot:0, fol:0},
{id:"taco_† ", name:"Blank values ​​in this table: unsolicited analyses.", cat:"Other", cal:0, pro:0, carb:0, fat:0, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0, calc:0, zinc:0, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:0, pot:0, fol:0},
{id:"taco_††", name:"Alcohol content (g/100g): ¹ Sugarcane brandy: 31.1 and ² Beer, pilsner: 3.6.", cat:"Other", cal:0, pro:0, carb:0, fat:0, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0, calc:0, zinc:0, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:0, pot:0, fol:0},
{id:"taco_†††", name:"Abbreviations: g: gram; mg: microgram; kcal: kilocalorie; kJ: kilojoule; mg: milligram; NA: not applicable; Tr: trace. Trace was adopted in the following situations: a) nutrient values ​​rounded to numbers that fall between 0 and 0.5; b) nutrient values ​​rounded to numbers with one decimal place that fall between 0 and 0.05; c) nutrient values ​​rounded to numbers with two decimal places that fall between 0 and 0.005; and d) values ​​below the limits of quantification (29).", cat:"Other", cal:0, pro:0, carb:0, fat:0, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0, calc:0, zinc:0, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:0, pot:0, fol:0},
{id:"taco_††††", name:"Quantification Limits: a) centesimal composition: 0.1g/100g; b) cholesterol: 1mg/100g; c) Cu, Fe, Mn, and Zn: 0.001mg/100g; d) Ca, Na: 0.04mg/100g; e) K and P: 0.001mg/100g; f) Mg 0.015mg/100g; g) thiamine, riboflavin, and pyridoxine: 0.03mg/100g; h) niacin and vitamin C: 1mg/100g; i) retinol in meat products and others: 3μg/100g; and j) retinol in dairy products: 20μg/100g.", cat:"Other", cal:0, pro:0, carb:0, fat:0, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0, calc:0, zinc:0, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:0, pot:0, fol:0},
{id:"usda_321358", name:"Hummus, commercial", cat:"Legumes", cal:229, pro:7.35, carb:14.9, fat:17.1, fib:5.4, fibSol:0, fibInsol:0, fatSat:2.22, fatMufa:6.37, fatPufa:7.48, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:2.41, calc:41, zinc:1.38, b12:0, vitD:0, omega3:0.637, iod:0, sel:16.2, mag:71.1, pot:289, fol:36},
{id:"usda_321360", name:"Tomatoes, grape, raw", cat:"Vegetables", cal:27, pro:0.83, carb:5.51, fat:0.63, fib:2.1, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.33, calc:11, zinc:0.2, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:11.9, pot:260, fol:10},
{id:"usda_321611", name:"Beans, snap, green, canned, regular pack, drained solids", cat:"Vegetables", cal:21, pro:1.04, carb:4.11, fat:0.39, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.78, calc:36, zinc:0.19, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:12.7, pot:97, fol:0},
{id:"usda_323121", name:"Frankfurter, beef, unheated", cat:"Meat", cal:314, pro:11.7, carb:2.89, fat:28, fib:0, fibSol:0, fibInsol:0, fatSat:11.4, fatMufa:12.1, fatPufa:0.954, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:1.14, calc:15, zinc:2.06, b12:0.97, vitD:0, omega3:0.078, iod:0, sel:0, mag:11.5, pot:343, fol:0},
{id:"usda_323294", name:"Nuts, almonds, dry roasted, with salt added", cat:"Nuts & Seeds", cal:620, pro:20.4, carb:16.2, fat:57.8, fib:11, fibSol:0, fibInsol:0, fatSat:4.56, fatMufa:34.2, fatPufa:14.5, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:3.17, calc:273, zinc:2.8, b12:0, vitD:0, omega3:0.05, iod:0, sel:0, mag:258, pot:684, fol:35},
{id:"usda_323505", name:"Kale, raw", cat:"Vegetables", cal:35, pro:2.92, carb:4.42, fat:1.49, fib:4.1, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:1.6, calc:254, zinc:0.39, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:32.7, pot:348, fol:62},
{id:"usda_323604", name:"Egg, whole, raw, frozen, pasteurized", cat:"Dairy & Eggs", cal:150, pro:12.3, carb:0.91, fat:10.3, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:1.77, calc:55, zinc:1.2, b12:0, vitD:2.3, omega3:0, iod:61.6, sel:0, mag:11.2, pot:117, fol:0},
{id:"usda_323697", name:"Egg, white, raw, frozen, pasteurized", cat:"Dairy & Eggs", cal:48, pro:10.1, carb:0.74, fat:0.16, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.18, calc:9, zinc:0.02, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:10.6, pot:130, fol:0},
{id:"usda_323793", name:"Egg, white, dried", cat:"Dairy & Eggs", cal:376, pro:79.9, carb:6.02, fat:0.65, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0, calc:104, zinc:0.43, b12:0, vitD:0, omega3:0, iod:34, sel:0, mag:87.6, pot:959, fol:0},
{id:"usda_324317", name:"Onion rings, breaded, par fried, frozen, prepared, heated in oven", cat:"Vegetables", cal:288, pro:4.52, carb:36.3, fat:14.4, fib:2.4, fibSol:0, fibInsol:0, fatSat:2.15, fatMufa:2.87, fatPufa:7.58, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:1.14, calc:28, zinc:0.59, b12:0, vitD:0, omega3:0.859, iod:0, sel:5.6, mag:20.4, pot:135, fol:31},
{id:"usda_324653", name:"Pickles, cucumber, dill or kosher dill", cat:"Vegetables", cal:12, pro:0.48, carb:1.99, fat:0.43, fib:1, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.23, calc:54, zinc:0.11, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:7.1, pot:112, fol:8},
{id:"usda_325036", name:"Cheese, parmesan, grated", cat:"Dairy & Eggs", cal:421, pro:29.6, carb:12.4, fat:28, fib:0, fibSol:0, fibInsol:0, fatSat:15.5, fatMufa:6.4, fatPufa:1.2, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.45, calc:884, zinc:4.33, b12:1.35, vitD:0, omega3:0.102, iod:0, sel:35, mag:34.9, pot:184, fol:6},
{id:"usda_325198", name:"Cheese, pasteurized process, American, vitamin D fortified", cat:"Dairy & Eggs", cal:366, pro:18, carb:5.27, fat:30.6, fib:0, fibSol:0, fibInsol:0, fatSat:18.1, fatMufa:7.3, fatPufa:1.09, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.48, calc:866, zinc:2.42, b12:1.45, vitD:7.5, omega3:0.138, iod:0, sel:20.4, mag:25.1, pot:149, fol:0},
{id:"usda_325287", name:"Grapefruit juice, white, canned or bottled, unsweetened", cat:"Fruit", cal:37, pro:0.55, carb:7.59, fat:0.7, fib:0.2, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.07, calc:16, zinc:0.04, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:9.6, pot:141, fol:12},
{id:"usda_325430", name:"Peaches, yellow, raw", cat:"Fruit", cal:42, pro:0.91, carb:10.1, fat:0.27, fib:1.5, fibSol:0.6, fibInsol:0.9, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0.012, aaIle:0.016, aaLeu:0.026, aaLys:0.028, aaMet:0.009, aaPhe:0.018, aaThr:0.015, aaTrp:0.009, aaVal:0.021, iron:0.34, calc:4, zinc:0.23, b12:0, vitD:0, omega3:0, iod:0, sel:2.1, mag:8, pot:122, fol:6},
{id:"usda_325524", name:"Seeds, sunflower seed kernels, dry roasted, with salt added", cat:"Nuts & Seeds", cal:612, pro:21, carb:17.1, fat:56.1, fib:10.3, fibSol:0, fibInsol:0, fatSat:5.36, fatMufa:33.4, fatPufa:13, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:5.21, calc:78, zinc:6, b12:0, vitD:0, omega3:0.059, iod:0, sel:80.4, mag:358, pot:689, fol:169},
{id:"usda_326196", name:"Kale, frozen, cooked, boiled, drained, without salt", cat:"Vegetables", cal:36, pro:2.94, carb:5.3, fat:1.21, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.84, calc:150, zinc:0.27, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:25, pot:144, fol:65},
{id:"usda_326698", name:"Mustard, prepared, yellow", cat:"Other", cal:61, pro:4.25, carb:5.3, fat:3.38, fib:4.3, fibSol:0, fibInsol:0, fatSat:0.252, fatMufa:2.59, fatPufa:0.903, aaHis:0.13, aaIle:0.16, aaLeu:0.32, aaLys:0.29, aaMet:0.083, aaPhe:0.177, aaThr:0.183, aaTrp:0.01, aaVal:0.207, iron:1.59, calc:63, zinc:0.64, b12:0, vitD:0, omega3:0.444, iod:0, sel:34, mag:47.7, pot:150, fol:7},
{id:"usda_327046", name:"Kiwifruit, green, raw", cat:"Fruit", cal:58, pro:1.06, carb:14, fat:0.44, fib:3, fibSol:0.7, fibInsol:2.3, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0.024, aaIle:0.046, aaLeu:0.059, aaLys:0.055, aaMet:0.022, aaPhe:0.039, aaThr:0.043, aaTrp:0.013, aaVal:0.052, iron:0.24, calc:35, zinc:0.14, b12:0, vitD:0, omega3:0, iod:0, sel:0.2, mag:15.7, pot:198, fol:26},
{id:"usda_327357", name:"Nectarines, raw", cat:"Fruit", cal:39, pro:1.06, carb:9.18, fat:0.28, fib:1.5, fibSol:0.6, fibInsol:0.9, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0.008, aaIle:0.008, aaLeu:0.013, aaLys:0.015, aaMet:0.005, aaPhe:0.01, aaThr:0.008, aaTrp:0.005, aaVal:0.012, iron:0.3, calc:2, zinc:0.21, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:8.8, pot:131, fol:6},
{id:"usda_328637", name:"Cheese, cheddar", cat:"Dairy & Eggs", cal:408, pro:23.3, carb:2.44, fat:34, fib:0, fibSol:0, fibInsol:0, fatSat:19.2, fatMufa:7.44, fatPufa:1.18, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.16, calc:707, zinc:3.67, b12:1.06, vitD:0, omega3:0.116, iod:0, sel:28.3, mag:26.8, pot:77, fol:21},
{id:"usda_328841", name:"Cheese, cottage, lowfat, 2% milkfat", cat:"Dairy & Eggs", cal:84, pro:11, carb:4.31, fat:2.3, fib:0, fibSol:0, fibInsol:0, fatSat:1.26, fatMufa:0.469, fatPufa:0.072, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.13, calc:103, zinc:0.61, b12:0.42, vitD:0, omega3:0.007, iod:0, sel:14.6, mag:8.9, pot:120, fol:10},
{id:"usda_329370", name:"Cheese, mozzarella, low moisture, part-skim", cat:"Dairy & Eggs", cal:298, pro:23.7, carb:4.44, fat:20.4, fib:0, fibSol:0, fibInsol:0, fatSat:11.7, fatMufa:4.65, fatPufa:0.744, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.2, calc:693, zinc:3.62, b12:1.65, vitD:0, omega3:0.075, iod:0, sel:26.7, mag:27.2, pot:116, fol:26},
{id:"usda_329490", name:"Egg, whole, dried", cat:"Dairy & Eggs", cal:575, pro:48.1, carb:1.87, fat:39.8, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:6.97, calc:220, zinc:5.02, b12:0, vitD:9.7, omega3:0, iod:274, sel:0, mag:44.6, pot:468, fol:0},
{id:"usda_329596", name:"Egg, yolk, raw, frozen, pasteurized", cat:"Dairy & Eggs", cal:296, pro:15.6, carb:0.59, fat:25.1, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:4.13, calc:119, zinc:2.93, b12:0, vitD:5.8, omega3:0, iod:177, sel:0, mag:11.2, pot:102, fol:0},
{id:"usda_329716", name:"Egg, yolk, dried", cat:"Dairy & Eggs", cal:654, pro:34.2, carb:1.07, fat:55.5, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:9.28, calc:270, zinc:7.11, b12:0, vitD:15.7, omega3:0, iod:349, sel:0, mag:26, pot:231, fol:0},
{id:"usda_330137", name:"Yogurt, Greek, plain, nonfat", cat:"Dairy & Eggs", cal:61, pro:10.3, carb:3.64, fat:0.37, fib:0, fibSol:0, fibInsol:0, fatSat:0.108, fatMufa:0.043, fatPufa:0.011, aaHis:0.293, aaIle:0.527, aaLeu:1.03, aaLys:0.833, aaMet:0.293, aaPhe:0.513, aaThr:0.41, aaTrp:0.133, aaVal:0.667, iron:0.07, calc:111, zinc:0.53, b12:0.7, vitD:0, omega3:0.001, iod:0, sel:9.9, mag:10.7, pot:141, fol:0},
{id:"usda_330415", name:"Yogurt, Greek, strawberry, nonfat", cat:"Dairy & Eggs", cal:83, pro:8.06, carb:12.2, fat:0.15, fib:0.6, fibSol:0, fibInsol:0, fatSat:0.103, fatMufa:0.029, fatPufa:0.021, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.09, calc:97, zinc:0.46, b12:0.45, vitD:1, omega3:0.006, iod:0, sel:9.8, mag:10.4, pot:133, fol:20},
{id:"usda_330458", name:"Oil, coconut", cat:"Fats & Oils", cal:833, pro:0, carb:0.84, fat:99.1, fib:0, fibSol:0, fibInsol:0, fatSat:82.5, fatMufa:6.31, fatPufa:1.7, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.05, calc:1, zinc:0.02, b12:0, vitD:0, omega3:0.02, iod:0, sel:0, mag:0, pot:0, fol:0},
{id:"usda_331897", name:"Chicken, broilers or fryers, drumstick, meat only, cooked, braised", cat:"Meat", cal:156, pro:23.9, carb:0, fat:5.95, fib:0, fibSol:0, fibInsol:0, fatSat:1.6, fatMufa:2.35, fatPufa:1.24, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.94, calc:12, zinc:2.54, b12:0.41, vitD:0.1, omega3:0.045, iod:0, sel:27.9, mag:22.4, pot:239, fol:0},
{id:"usda_331960", name:"Chicken, broiler or fryers, breast, skinless, boneless, meat only, cooked, braised", cat:"Meat", cal:166, pro:32.1, carb:0, fat:3.24, fib:0, fibSol:0, fibInsol:0, fatSat:1.01, fatMufa:1.26, fatPufa:0.766, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.49, calc:6, zinc:0.96, b12:0.2, vitD:0, omega3:0.026, iod:0, sel:31.9, mag:32, pot:343, fol:0},
{id:"usda_332282", name:"Sauce, pasta, spaghetti/marinara, ready-to-serve", cat:"Other", cal:45, pro:1.41, carb:8.05, fat:1.48, fib:1.8, fibSol:0, fibInsol:0, fatSat:0.17, fatMufa:0.376, fatPufa:0.504, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.78, calc:27, zinc:0.2, b12:0, vitD:0, omega3:0.079, iod:0, sel:0, mag:18.5, pot:319, fol:0},
{id:"usda_332397", name:"Ham, sliced, pre-packaged, deli meat (96%fat free, water added)", cat:"Meat", cal:106, pro:16.7, carb:0.27, fat:3.73, fib:0, fibSol:0, fibInsol:0, fatSat:1.12, fatMufa:1.47, fatPufa:0.544, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.58, calc:5, zinc:1.52, b12:0, vitD:0, omega3:0.013, iod:0, sel:0, mag:18.8, pot:425, fol:0},
{id:"usda_332791", name:"Olives, green, Manzanilla, stuffed with pimiento", cat:"Fruit", cal:130, pro:1.15, carb:4.96, fat:12.9, fib:4, fibSol:0, fibInsol:0, fatSat:2.3, fatMufa:8.86, fatPufa:0.661, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.31, calc:121, zinc:0.09, b12:0, vitD:0, omega3:0.104, iod:0, sel:0, mag:12.4, pot:43, fol:0},
{id:"usda_333008", name:"Cookies, oatmeal, soft, with raisins", cat:"Grains", cal:430, pro:5.79, carb:69.6, fat:14.3, fib:3.3, fibSol:0, fibInsol:0, fatSat:4.78, fatMufa:4, fatPufa:4.89, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:2.28, calc:29, zinc:0.62, b12:0, vitD:0, omega3:0.632, iod:0, sel:6, mag:32.4, pot:245, fol:34},
{id:"usda_333281", name:"Tomatoes, canned, red, ripe, diced", cat:"Vegetables", cal:18, pro:0.84, carb:3.32, fat:0.5, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.57, calc:30, zinc:0.12, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:9.8, pot:198, fol:0},
{id:"usda_333374", name:"Fish, haddock, raw", cat:"Fish & Seafood", cal:74, pro:16.3, carb:0, fat:0.45, fib:0, fibSol:0, fibInsol:0, fatSat:0.093, fatMufa:0.057, fatPufa:0.163, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.17, calc:11, zinc:0.32, b12:1.83, vitD:0.5, omega3:0.002, iod:0, sel:25.9, mag:21.1, pot:286, fol:0},
{id:"usda_333476", name:"Fish, pollock, raw", cat:"Fish & Seafood", cal:56, pro:12.3, carb:0, fat:0.41, fib:0, fibSol:0, fibInsol:0, fatSat:0.128, fatMufa:0.073, fatPufa:0.182, aaHis:0.28, aaIle:0.62, aaLeu:1.06, aaLys:1.21, aaMet:0.4, aaPhe:0.51, aaThr:0.58, aaTrp:0.18, aaVal:0.67, iron:0.22, calc:15, zinc:0.31, b12:1.63, vitD:0.2, omega3:0.001, iod:0, sel:15.9, mag:16.1, pot:160, fol:0},
{id:"usda_334194", name:"Fish, tuna, light, canned in water, drained solids", cat:"Fish & Seafood", cal:90, pro:19, carb:0.08, fat:0.94, fib:0, fibSol:0, fibInsol:0, fatSat:0.224, fatMufa:0.114, fatPufa:0.259, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:1.67, calc:18, zinc:0.66, b12:2.57, vitD:1.2, omega3:0.002, iod:0, sel:67.8, mag:22.7, pot:176, fol:0},
{id:"usda_334536", name:"Restaurant, Chinese, fried rice, without meat", cat:"Other", cal:174, pro:3.84, carb:32.5, fat:3.19, fib:0, fibSol:0, fibInsol:0, fatSat:0.493, fatMufa:0.588, fatPufa:1.13, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.46, calc:11, zinc:0.69, b12:0, vitD:0, omega3:0.118, iod:0, sel:0, mag:9.7, pot:69, fol:0},
{id:"usda_334628", name:"Restaurant, Latino, tamale, pork", cat:"Other", cal:174, pro:7.38, carb:15.8, fat:9.04, fib:2.4, fibSol:0, fibInsol:0, fatSat:2.69, fatMufa:3.2, fatPufa:2.03, aaHis:0.175, aaIle:0.245, aaLeu:0.5, aaLys:0.44, aaMet:0.165, aaPhe:0.235, aaThr:0.25, aaTrp:0.06, aaVal:0.28, iron:0.87, calc:75, zinc:1.2, b12:0.12, vitD:0, omega3:0.099, iod:0, sel:9.8, mag:26.2, pot:152, fol:0},
{id:"usda_334720", name:"Restaurant, Latino, pupusas con frijoles (pupusas, bean)", cat:"Other", cal:229, pro:5.59, carb:31.5, fat:9.01, fib:5.8, fibSol:0, fibInsol:0, fatSat:2.19, fatMufa:2.95, fatPufa:2.88, aaHis:0.17, aaIle:0.227, aaLeu:0.543, aaLys:0.303, aaMet:0.103, aaPhe:0.3, aaThr:0.22, aaTrp:0.057, aaVal:0.267, iron:1.46, calc:51, zinc:0.94, b12:0, vitD:0, omega3:0.329, iod:0, sel:7, mag:53.6, pot:305, fol:0},
{id:"usda_746758", name:"Beef, loin, tenderloin roast, separable lean only, boneless, trimmed to 0\" fat, select, cooked, roasted", cat:"Meat", cal:176, pro:27.7, carb:0, fat:6.36, fib:0, fibSol:0, fibInsol:0, fatSat:2.47, fatMufa:2.26, fatPufa:0.472, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:3.04, calc:13, zinc:3.7, b12:4.21, vitD:0, omega3:0.012, iod:0, sel:25.4, mag:13.7, pot:352, fol:0},
{id:"usda_746759", name:"Beef, loin, top loin steak, boneless, lip-on, separable lean only, trimmed to 1/8\" fat, choice, raw", cat:"Meat", cal:155, pro:22.8, carb:0, fat:6.39, fib:0, fibSol:0, fibInsol:0, fatSat:2.56, fatMufa:2.71, fatPufa:0.364, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:1.9, calc:15, zinc:3.76, b12:1.72, vitD:0, omega3:0.009, iod:0, sel:21.3, mag:11.3, pot:282, fol:0},
{id:"usda_746760", name:"Beef, round, eye of round roast, boneless, separable lean only, trimmed to 0\" fat, select, raw", cat:"Meat", cal:122, pro:23.4, carb:0, fat:2.48, fib:0, fibSol:0, fibInsol:0, fatSat:0.953, fatMufa:0.951, fatPufa:0.192, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:1.37, calc:13, zinc:3.38, b12:2.06, vitD:0, omega3:0.005, iod:0, sel:22.2, mag:11.4, pot:312, fol:0},
{id:"usda_746761", name:"Beef, round, top round roast, boneless, separable lean only, trimmed to 0\" fat, select, raw", cat:"Meat", cal:123, pro:23.7, carb:0, fat:2.41, fib:0, fibSol:0, fibInsol:0, fatSat:0.924, fatMufa:0.886, fatPufa:0.208, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:2.34, calc:13, zinc:3.54, b12:1.62, vitD:0, omega3:0.003, iod:0, sel:22.7, mag:11.9, pot:316, fol:0},
{id:"usda_746762", name:"Beef, short loin, porterhouse steak, separable lean only, trimmed to 1/8\" fat, select, raw", cat:"Meat", cal:145, pro:22.7, carb:0, fat:5.32, fib:0, fibSol:0, fibInsol:0, fatSat:2.07, fatMufa:1.9, fatPufa:0.259, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:2.26, calc:19, zinc:3.52, b12:1.98, vitD:0, omega3:0.008, iod:0, sel:21.4, mag:10.7, pot:266, fol:0},
{id:"usda_746763", name:"Beef, short loin, t-bone steak, bone-in, separable lean only, trimmed to 1/8\" fat, choice, cooked, grilled", cat:"Meat", cal:219, pro:27.3, carb:0, fat:11.4, fib:0, fibSol:0, fibInsol:0, fatSat:4.68, fatMufa:4.67, fatPufa:0.514, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:3.53, calc:19, zinc:4.69, b12:1.88, vitD:0, omega3:0.021, iod:0, sel:29.7, mag:20, pot:283, fol:0},
{id:"usda_746764", name:"Carrots, frozen, unprepared", cat:"Vegetables", cal:37, pro:0.81, carb:7.92, fat:0.47, fib:3.2, fibSol:1.4, fibInsol:1.9, fatSat:0, fatMufa:0, fatPufa:0.163, aaHis:0.03, aaIle:0.052, aaLeu:0.066, aaLys:0.075, aaMet:0.015, aaPhe:0.042, aaThr:0.127, aaTrp:0.007, aaVal:0.047, iron:0.43, calc:33, zinc:0.28, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:10.8, pot:210, fol:7},
{id:"usda_746765", name:"Cheese, dry white, queso seco", cat:"Dairy & Eggs", cal:326, pro:24.5, carb:2.07, fat:24.3, fib:0, fibSol:0, fibInsol:0, fatSat:13.7, fatMufa:5.7, fatPufa:1.06, aaHis:0.675, aaIle:1.16, aaLeu:2.29, aaLys:1.96, aaMet:0.535, aaPhe:1.17, aaThr:0.95, aaTrp:0.31, aaVal:1.48, iron:0.18, calc:661, zinc:3.28, b12:1.7, vitD:1.83, omega3:0.11, iod:0, sel:22.4, mag:26.7, pot:116, fol:0},
{id:"usda_746766", name:"Cheese, ricotta, whole milk", cat:"Dairy & Eggs", cal:157, pro:7.81, carb:6.86, fat:11, fib:0, fibSol:0, fibInsol:0, fatSat:6.97, fatMufa:2.56, fatPufa:0.389, aaHis:0.175, aaIle:0.365, aaLeu:0.785, aaLys:0.655, aaMet:0.17, aaPhe:0.27, aaThr:0.395, aaTrp:0.115, aaVal:0.325, iron:0.1, calc:224, zinc:0.56, b12:0.78, vitD:0, omega3:0.042, iod:0, sel:5.5, mag:19.7, pot:230, fol:4},
{id:"usda_746767", name:"Cheese, swiss", cat:"Dairy & Eggs", cal:393, pro:27, carb:1.44, fat:31, fib:0, fibSol:0, fibInsol:0, fatSat:18.2, fatMufa:7.26, fatPufa:1.14, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.13, calc:890, zinc:4.37, b12:3.02, vitD:0, omega3:0.125, iod:0, sel:30.1, mag:33.4, pot:71, fol:9},
{id:"usda_746768", name:"Figs, dried, uncooked", cat:"Fruit", cal:249, pro:3.3, carb:63.9, fat:0.92, fib:9.8, fibSol:1.5, fibInsol:8.3, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0.034, aaIle:0.082, aaLeu:0.116, aaLys:0.081, aaMet:0.031, aaPhe:0.069, aaThr:0.078, aaTrp:0.019, aaVal:0.113, iron:2.03, calc:162, zinc:0.66, b12:0, vitD:0, omega3:0, iod:0, sel:0.6, mag:67.6, pot:680, fol:9},
{id:"usda_746769", name:"Lettuce, cos or romaine, raw", cat:"Vegetables", cal:17, pro:1.24, carb:3.24, fat:0.26, fib:1.8, fibSol:0.1, fibInsol:1.7, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0.021, aaIle:0.045, aaLeu:0.076, aaLys:0.064, aaMet:0.014, aaPhe:0.066, aaThr:0.044, aaTrp:0.011, aaVal:0.055, iron:0.95, calc:35, zinc:0.25, b12:0, vitD:0, omega3:0, iod:0, sel:0.4, mag:13.7, pot:253, fol:50},
{id:"usda_746770", name:"Melons, cantaloupe, raw", cat:"Fruit", cal:34, pro:0.82, carb:8.16, fat:0.18, fib:0.8, fibSol:0.3, fibInsol:0.5, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0.012, aaIle:0.017, aaLeu:0.024, aaLys:0.024, aaMet:0.01, aaPhe:0.019, aaThr:0.014, aaTrp:0.002, aaVal:0.027, iron:0.38, calc:9, zinc:0.44, b12:0, vitD:0, omega3:0, iod:0, sel:1.7, mag:13, pot:157, fol:14},
{id:"usda_746771", name:"Oranges, raw, navels", cat:"Fruit", cal:47, pro:0.91, carb:11.8, fat:0.15, fib:2, fibSol:0.2, fibInsol:1.8, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0.011, aaIle:0.014, aaLeu:0.025, aaLys:0.032, aaMet:0.007, aaPhe:0.051, aaThr:0.016, aaTrp:0.008, aaVal:0.022, iron:0.33, calc:43, zinc:0.11, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:10.7, pot:166, fol:25},
{id:"usda_746772", name:"Milk, lowfat, fluid, 1% milkfat, with added vitamin A and vitamin D", cat:"Dairy & Eggs", cal:43, pro:3.38, carb:5.18, fat:0.95, fib:0, fibSol:0, fibInsol:0, fatSat:0.568, fatMufa:0.21, fatPufa:0.032, aaHis:0.099, aaIle:0.174, aaLeu:0.342, aaLys:0.308, aaMet:0.092, aaPhe:0.168, aaThr:0.158, aaTrp:0.045, aaVal:0.21, iron:0, calc:126, zinc:0.43, b12:0.61, vitD:1.06, omega3:0.004, iod:36.2, sel:2.1, mag:12, pot:159, fol:2},
{id:"usda_746773", name:"Pears, raw, bartlett", cat:"Fruit", cal:57, pro:0.38, carb:15.1, fat:0.16, fib:3.1, fibSol:0.3, fibInsol:2.8, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0.002, aaIle:0.014, aaLeu:0.023, aaLys:0.021, aaMet:0.002, aaPhe:0.013, aaThr:0.013, aaTrp:0.002, aaVal:0.019, iron:0.17, calc:8, zinc:0.07, b12:0, vitD:0, omega3:0, iod:0, sel:0.2, mag:5.7, pot:87, fol:6},
{id:"usda_746774", name:"Restaurant, Chinese, sweet and sour pork", cat:"Other", cal:260, pro:8.88, carb:25.5, fat:13.6, fib:1, fibSol:0, fibInsol:0, fatSat:2.68, fatMufa:3.49, fatPufa:7.05, aaHis:0.287, aaIle:0.377, aaLeu:0.707, aaLys:0.663, aaMet:0.207, aaPhe:0.343, aaThr:0.373, aaTrp:0.102, aaVal:0.41, iron:3.07, calc:46, zinc:1.07, b12:0.19, vitD:0, omega3:0.785, iod:0, sel:9.7, mag:13, pot:152, fol:0},
{id:"usda_746775", name:"Salt, table, iodized", cat:"Other", cal:0, pro:0, carb:0, fat:0, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0, calc:50, zinc:0, b12:0, vitD:0, omega3:0, iod:5080, sel:0, mag:0, pot:2, fol:0},
{id:"usda_746776", name:"Milk, nonfat, fluid, with added vitamin A and vitamin D (fat free or skim)", cat:"Dairy & Eggs", cal:34, pro:3.43, carb:4.92, fat:0.08, fib:0, fibSol:0, fibInsol:0, fatSat:0.049, fatMufa:0.017, fatPufa:0.006, aaHis:0.101, aaIle:0.182, aaLeu:0.347, aaLys:0.302, aaMet:0.093, aaPhe:0.168, aaThr:0.166, aaTrp:0.048, aaVal:0.222, iron:0, calc:132, zinc:0.45, b12:0.58, vitD:1.1, omega3:0, iod:35.7, sel:2, mag:12.5, pot:167, fol:2},
{id:"usda_746777", name:"Sauce, salsa, ready-to-serve", cat:"Other", cal:29, pro:1.44, carb:6.74, fat:0.19, fib:1.8, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.42, calc:28, zinc:0.2, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:15.2, pot:258, fol:0},
{id:"usda_746778", name:"Milk, reduced fat, fluid, 2% milkfat, with added vitamin A and vitamin D", cat:"Dairy & Eggs", cal:50, pro:3.36, carb:4.9, fat:1.9, fib:0, fibSol:0, fibInsol:0, fatSat:1.11, fatMufa:0.4, fatPufa:0.058, aaHis:0.099, aaIle:0.173, aaLeu:0.335, aaLys:0.293, aaMet:0.089, aaPhe:0.163, aaThr:0.162, aaTrp:0.042, aaVal:0.213, iron:0, calc:126, zinc:0.43, b12:0.55, vitD:1.13, omega3:0.007, iod:39.6, sel:1.8, mag:12, pot:159, fol:2},
{id:"usda_746779", name:"Sausage, breakfast sausage, beef, pre-cooked, unprepared", cat:"Meat", cal:328, pro:13.3, carb:3.37, fat:28.7, fib:0, fibSol:0, fibInsol:0, fatSat:11.3, fatMufa:12.7, fatPufa:1.91, aaHis:0.35, aaIle:0.46, aaLeu:0.93, aaLys:0.95, aaMet:0.26, aaPhe:0.6, aaThr:0.5, aaTrp:0.12, aaVal:0.53, iron:1.55, calc:35, zinc:2.14, b12:1.13, vitD:0, omega3:0.092, iod:0, sel:11.6, mag:19.7, pot:263, fol:0},
{id:"usda_746780", name:"Sausage, Italian, pork, mild, cooked, pan-fried", cat:"Meat", cal:322, pro:18.2, carb:2.15, fat:26.2, fib:0, fibSol:0, fibInsol:0, fatSat:9.15, fatMufa:11.6, fatPufa:4.96, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:1.29, calc:12, zinc:2.41, b12:1.06, vitD:0, omega3:0.175, iod:0, sel:20.2, mag:18.6, pot:310, fol:0},
{id:"usda_746781", name:"Sausage, pork, chorizo, link or ground, cooked, pan-fried", cat:"Meat", cal:346, pro:19.3, carb:2.63, fat:28.1, fib:0, fibSol:0, fibInsol:0, fatSat:9.45, fatMufa:11.7, fatPufa:4.74, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:2.34, calc:37, zinc:2.19, b12:1.21, vitD:0, omega3:0.184, iod:0, sel:25.9, mag:30.1, pot:435, fol:10},
{id:"usda_746782", name:"Milk, whole, 3.25% milkfat, with added vitamin D", cat:"Dairy & Eggs", cal:60, pro:3.27, carb:4.63, fat:3.2, fib:0, fibSol:0, fibInsol:0, fatSat:1.86, fatMufa:0.688, fatPufa:0.108, aaHis:0.097, aaIle:0.173, aaLeu:0.333, aaLys:0.298, aaMet:0.09, aaPhe:0.161, aaThr:0.154, aaTrp:0.043, aaVal:0.207, iron:0, calc:123, zinc:0.42, b12:0.54, vitD:0.96, omega3:0.012, iod:37.9, sel:1.9, mag:11.9, pot:150, fol:0},
{id:"usda_746783", name:"Sausage, turkey, breakfast links, mild, raw", cat:"Meat", cal:169, pro:16.7, carb:0.93, fat:10.4, fib:0, fibSol:0, fibInsol:0, fatSat:2.53, fatMufa:3.07, fatPufa:3.15, aaHis:0.42, aaIle:0.65, aaLeu:1.24, aaLys:1.41, aaMet:0.45, aaPhe:0.82, aaThr:0.71, aaTrp:0.15, aaVal:0.65, iron:1.17, calc:32, zinc:2.58, b12:1.2, vitD:0, omega3:0.186, iod:0, sel:12.5, mag:18.9, pot:310, fol:0},
{id:"usda_746784", name:"Sugars, granulated", cat:"Other", cal:385, pro:0, carb:99.6, fat:0.32, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.05, calc:1, zinc:0.01, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:0.3, pot:2, fol:0},
{id:"usda_746785", name:"Turkey, ground, 93% lean, 7% fat, pan-broiled crumbles", cat:"Meat", cal:220, pro:27.1, carb:0, fat:11.6, fib:0, fibSol:0, fibInsol:0, fatSat:2.97, fatMufa:3.78, fatPufa:3.49, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:1.56, calc:31, zinc:3.77, b12:1.9, vitD:0, omega3:0.175, iod:0, sel:28.4, mag:29.1, pot:304, fol:0},
{id:"usda_746952", name:"Ham, sliced, restaurant", cat:"Meat", cal:121, pro:19.6, carb:2.36, fat:3.68, fib:0, fibSol:0, fibInsol:0, fatSat:1.25, fatMufa:1.6, fatPufa:0.675, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.86, calc:6, zinc:1.76, b12:0, vitD:0, omega3:0.016, iod:0, sel:0, mag:20.3, pot:484, fol:0},
{id:"usda_747429", name:"Cheese, American, restaurant", cat:"Dairy & Eggs", cal:375, pro:17.5, carb:6.35, fat:31.1, fib:0, fibSol:0, fibInsol:0, fatSat:17.7, fatMufa:6.62, fatPufa:1.23, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.24, calc:508, zinc:2.45, b12:0, vitD:0, omega3:0.143, iod:54.1, sel:0, mag:25, pot:173, fol:0},
{id:"usda_747430", name:"Beans, Dry, Medium Red (0% moisture)", cat:"Legumes", cal:0, pro:25.5, carb:0, fat:1.04, fib:4.3, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:6.27, calc:193, zinc:3.82, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:178, pot:1490, fol:0},
{id:"usda_747431", name:"Beans, Dry, Red (0% moisture)", cat:"Legumes", cal:0, pro:21.3, carb:0, fat:1.16, fib:4, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:5.05, calc:148, zinc:2.84, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:152, pot:1540, fol:0},
{id:"usda_747432", name:"Beans, Dry, Flor de Mayo (0% moisture)", cat:"Legumes", cal:0, pro:23.3, carb:0, fat:0.86, fib:4, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:4.47, calc:180, zinc:3.42, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:182, pot:1490, fol:0},
{id:"usda_747433", name:"Beans, Dry, Brown (0% moisture)", cat:"Legumes", cal:0, pro:25.6, carb:0, fat:1.12, fib:4.1, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:4.7, calc:158, zinc:3.71, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:158, pot:1580, fol:0},
{id:"usda_747434", name:"Beans, Dry, Tan (0% moisture)", cat:"Legumes", cal:0, pro:26.8, carb:0, fat:1.14, fib:4.4, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:5.85, calc:178, zinc:3.5, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:198, pot:1620, fol:0},
{id:"usda_747435", name:"Beans, Dry, Light Tan (0% moisture)", cat:"Legumes", cal:0, pro:24.6, carb:0, fat:1.28, fib:4.3, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:7.29, calc:98, zinc:3.23, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:178, pot:1230, fol:0},
{id:"usda_747436", name:"Beans, Dry, Carioca (0% moisture)", cat:"Legumes", cal:0, pro:25.2, carb:0, fat:1.44, fib:4.5, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:5.87, calc:194, zinc:3.36, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:179, pot:1390, fol:0},
{id:"usda_747437", name:"Beans, Dry, Cranberry (0% moisture)", cat:"Legumes", cal:0, pro:24.4, carb:0, fat:1.23, fib:4.3, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:5.26, calc:152, zinc:3.03, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:166, pot:1340, fol:0},
{id:"usda_747438", name:"Beans, Dry, Light Red Kidney (0% moisture)", cat:"Legumes", cal:0, pro:25, carb:0, fat:1.03, fib:4.5, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:6.95, calc:103, zinc:3.5, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:158, pot:1540, fol:0},
{id:"usda_747439", name:"Beans, Dry, Pink (0% moisture)", cat:"Legumes", cal:0, pro:23.4, carb:0, fat:1.2, fib:4.1, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:5.46, calc:137, zinc:3.26, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:164, pot:1490, fol:0},
{id:"usda_747440", name:"Beans, Dry, Dark Red Kidney (0% moisture)", cat:"Legumes", cal:0, pro:25.9, carb:0, fat:1.31, fib:4.3, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:6.58, calc:98, zinc:3.29, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:164, pot:1490, fol:0},
{id:"usda_747441", name:"Beans, Dry, Navy (0% moisture)", cat:"Legumes", cal:0, pro:24.1, carb:0, fat:1.51, fib:4.3, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:5.29, calc:229, zinc:3.31, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:180, pot:1470, fol:0},
{id:"usda_747442", name:"Beans, Dry, Small White (0% moisture)", cat:"Legumes", cal:0, pro:24.5, carb:0, fat:1.32, fib:4.3, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:4.93, calc:236, zinc:3.54, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:182, pot:1540, fol:0},
{id:"usda_747443", name:"Beans, Dry, Small Red (0% moisture)", cat:"Legumes", cal:0, pro:23.5, carb:0, fat:1.28, fib:4.1, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:4.95, calc:149, zinc:3.23, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:167, pot:1520, fol:0},
{id:"usda_747444", name:"Beans, Dry, Black (0% moisture)", cat:"Legumes", cal:0, pro:24.4, carb:0, fat:1.45, fib:4.2, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:5.34, calc:191, zinc:3.37, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:180, pot:1540, fol:0},
{id:"usda_747445", name:"Beans, Dry, Pinto (0% moisture)", cat:"Legumes", cal:0, pro:23.7, carb:0, fat:1.24, fib:4.1, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:5.4, calc:161, zinc:3.43, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:170, pot:1510, fol:0},
{id:"usda_747446", name:"Beans, Dry, Great Northern (0% moisture)", cat:"Legumes", cal:0, pro:24.7, carb:0, fat:1.24, fib:4.3, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:5.48, calc:192, zinc:3.45, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:176, pot:1520, fol:0},
{id:"usda_747447", name:"Broccoli, raw", cat:"Vegetables", cal:31, pro:2.57, carb:6.27, fat:0.34, fib:2.4, fibSol:0, fibInsol:2.4, fatSat:0.039, fatMufa:0.011, fatPufa:0.017, aaHis:0.059, aaIle:0.079, aaLeu:0.129, aaLys:0.135, aaMet:0.038, aaPhe:0.117, aaThr:0.088, aaTrp:0.033, aaVal:0.125, iron:0.69, calc:46, zinc:0.42, b12:0, vitD:0, omega3:0, iod:0, sel:1.6, mag:21, pot:303, fol:65},
{id:"usda_747693", name:"Ketchup, restaurant", cat:"Vegetables", cal:117, pro:1.11, carb:26.8, fat:0.55, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.43, calc:14, zinc:0.16, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:13.5, pot:249, fol:0},
{id:"usda_747997", name:"Eggs, Grade A, Large, egg white", cat:"Dairy & Eggs", cal:55, pro:10.7, carb:2.36, fat:0, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0.257, aaIle:0.609, aaLeu:1.02, aaLys:0.822, aaMet:0.486, aaPhe:0.726, aaThr:0.567, aaTrp:0.188, aaVal:0.779, iron:0, calc:0, zinc:0, b12:0, vitD:0, omega3:0, iod:0, sel:17.9, mag:0, pot:0, fol:0},
{id:"usda_748236", name:"Eggs, Grade A, Large, egg yolk", cat:"Dairy & Eggs", cal:334, pro:16.2, carb:1.02, fat:28.8, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0.369, aaIle:0.766, aaLeu:1.35, aaLys:1.2, aaMet:0.398, aaPhe:0.673, aaThr:0.789, aaTrp:0.174, aaVal:0.846, iron:0, calc:0, zinc:0, b12:0, vitD:0, omega3:0, iod:0, sel:55.8, mag:0, pot:0, fol:0},
{id:"usda_748278", name:"Oil, canola", cat:"Fats & Oils", cal:0, pro:0, carb:0, fat:0, fib:0, fibSol:0, fibInsol:0, fatSat:6.61, fatMufa:62.6, fatPufa:25.3, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0, calc:0, zinc:0, b12:0, vitD:0, omega3:7.45, iod:0, sel:0, mag:0, pot:0, fol:0},
{id:"usda_748323", name:"Oil, corn", cat:"Fats & Oils", cal:0, pro:0, carb:0, fat:0, fib:0, fibSol:0, fibInsol:0, fatSat:13.4, fatMufa:27.7, fatPufa:52.9, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0, calc:0, zinc:0, b12:0, vitD:0, omega3:1.04, iod:0, sel:0, mag:0, pot:0, fol:0},
{id:"usda_748366", name:"Oil, soybean", cat:"Fats & Oils", cal:0, pro:0, carb:0, fat:0, fib:0, fibSol:0, fibInsol:0, fatSat:14.9, fatMufa:22.1, fatPufa:57.6, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0, calc:0, zinc:0, b12:0, vitD:0, omega3:6.62, iod:0, sel:0, mag:0, pot:0, fol:0},
{id:"usda_748608", name:"Oil, olive, extra virgin", cat:"Fats & Oils", cal:0, pro:0, carb:0, fat:0, fib:0, fibSol:0, fibInsol:0, fatSat:15.4, fatMufa:69.2, fatPufa:9.07, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0, calc:0, zinc:0, b12:0, vitD:0, omega3:0.651, iod:0, sel:0, mag:0, pot:0, fol:0},
{id:"usda_748967", name:"Eggs, Grade A, Large, egg whole", cat:"Dairy & Eggs", cal:148, pro:12.4, carb:0.96, fat:9.96, fib:0, fibSol:0, fibInsol:0, fatSat:3.2, fatMufa:3.63, fatPufa:1.82, aaHis:0.283, aaIle:0.616, aaLeu:1.05, aaLys:0.832, aaMet:0.418, aaPhe:0.66, aaThr:0.594, aaTrp:0.166, aaVal:0.734, iron:1.67, calc:48, zinc:1.24, b12:1.02, vitD:2.46, omega3:0, iod:49.1, sel:31.1, mag:11.4, pot:132, fol:71},
{id:"usda_749420", name:"Pork, cured, bacon, cooked, restaurant", cat:"Meat", cal:500, pro:40.9, carb:2.1, fat:36.5, fib:0, fibSol:0, fibInsol:0, fatSat:12.6, fatMufa:15.8, fatPufa:6, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:1.28, calc:13, zinc:3.56, b12:0, vitD:0, omega3:0.227, iod:0, sel:0, mag:36.5, pot:557, fol:0},
{id:"usda_789828", name:"Butter, stick, unsalted", cat:"Dairy & Eggs", cal:0, pro:0, carb:0, fat:81.5, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.03, calc:14, zinc:0.07, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:1.6, pot:19, fol:0},
{id:"usda_789890", name:"Flour, wheat, all-purpose, enriched, bleached", cat:"Grains", cal:366, pro:10.9, carb:77.3, fat:1.48, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:5.62, calc:19, zinc:0.72, b12:0, vitD:0, omega3:0, iod:0, sel:15.7, mag:26.7, pot:136, fol:160},
{id:"usda_789951", name:"Flour, wheat, all-purpose, enriched, unbleached", cat:"Grains", cal:358, pro:13.1, carb:73.2, fat:1.48, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:5.41, calc:21, zinc:0.9, b12:0, vitD:0, omega3:0, iod:0, sel:14.2, mag:33.3, pot:135, fol:159},
{id:"usda_790018", name:"Flour, wheat, all-purpose, unenriched, unbleached", cat:"Grains", cal:362, pro:12, carb:74.6, fat:1.7, fib:3, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:1.18, calc:22, zinc:1.15, b12:0, vitD:0, omega3:0, iod:0, sel:20.1, mag:36.1, pot:150, fol:23},
{id:"usda_790085", name:"Flour, whole wheat, unenriched", cat:"Grains", cal:370, pro:15.1, carb:71.2, fat:2.73, fib:10.6, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:3.86, calc:38, zinc:3.24, b12:0, vitD:0, omega3:0, iod:0, sel:23.6, mag:136, pot:376, fol:39},
{id:"usda_790146", name:"Flour, bread, white, enriched, unbleached", cat:"Grains", cal:363, pro:14.3, carb:72.8, fat:1.65, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:5.55, calc:19, zinc:1.06, b12:0, vitD:0, omega3:0, iod:0, sel:33.3, mag:35.9, pot:127, fol:145},
{id:"usda_790214", name:"Flour, rice, white, unenriched", cat:"Grains", cal:359, pro:6.94, carb:79.8, fat:1.3, fib:0.5, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.22, calc:6, zinc:1.19, b12:0, vitD:0, omega3:0, iod:0, sel:5.3, mag:22.9, pot:75, fol:16},
{id:"usda_790276", name:"Flour, corn, yellow, fine meal, enriched", cat:"Grains", cal:364, pro:6.2, carb:80.8, fat:1.74, fib:4.3, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:4.44, calc:0, zinc:0.62, b12:0, vitD:0, omega3:0, iod:0, sel:8.3, mag:30.1, pot:144, fol:155},
{id:"usda_790508", name:"Butter, stick, salted", cat:"Dairy & Eggs", cal:0, pro:0, carb:0, fat:82.2, fib:0, fibSol:0, fibInsol:0, fatSat:45.6, fatMufa:16.9, fatPufa:2.52, aaHis:0.012, aaIle:0.022, aaLeu:0.05, aaLys:0.07, aaMet:0.013, aaPhe:0.025, aaThr:0.025, aaTrp:0.01, aaVal:0.03, iron:0.06, calc:21, zinc:0.07, b12:0, vitD:0.4, omega3:0.308, iod:0, sel:0, mag:1.6, pot:23, fol:5},
{id:"usda_790577", name:"Onions, red, raw", cat:"Vegetables", cal:44, pro:0.94, carb:9.93, fat:0.1, fib:2.2, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.24, calc:17, zinc:0.17, b12:0, vitD:0, omega3:0, iod:0, sel:0.5, mag:11.4, pot:197, fol:0},
{id:"usda_790646", name:"Onions, yellow, raw", cat:"Vegetables", cal:38, pro:0.83, carb:8.61, fat:0.05, fib:1.9, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.28, calc:15, zinc:0.2, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:9, pot:182, fol:0},
{id:"usda_1104647", name:"Garlic, raw", cat:"Vegetables", cal:143, pro:6.62, carb:28.2, fat:0.38, fib:2.7, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0, calc:0, zinc:0, b12:0, vitD:0, omega3:0, iod:0, sel:9.8, mag:0, pot:0, fol:0},
{id:"usda_1104705", name:"Flour, soy, defatted", cat:"Legumes", cal:366, pro:51.1, carb:32.9, fat:3.33, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:1.27, aaIle:2.31, aaLeu:4.11, aaLys:3.06, aaMet:0.622, aaPhe:2.86, aaThr:1.97, aaTrp:0.616, aaVal:2.31, iron:7.34, calc:338, zinc:4.44, b12:0, vitD:0, omega3:0, iod:0, sel:45.8, mag:313, pot:2480, fol:0},
{id:"usda_1104766", name:"Flour, soy, full-fat", cat:"Legumes", cal:452, pro:38.6, carb:27.9, fat:20.7, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0.95, aaIle:1.74, aaLeu:3.06, aaLys:2.14, aaMet:0.485, aaPhe:2.15, aaThr:1.48, aaTrp:0.45, aaVal:1.74, iron:9.51, calc:258, zinc:3.75, b12:0, vitD:0, omega3:0, iod:0, sel:14.3, mag:254, pot:1860, fol:0},
{id:"usda_1104812", name:"Flour, rice, brown", cat:"Grains", cal:365, pro:7.19, carb:75.5, fat:3.85, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:1.5, calc:10, zinc:1.91, b12:0, vitD:0, omega3:0, iod:0, sel:9.68, mag:124, pot:265, fol:0},
{id:"usda_1104867", name:"Flour, rice, glutinous", cat:"Grains", cal:358, pro:6.69, carb:80.1, fat:1.16, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.34, calc:10, zinc:1.34, b12:0, vitD:0, omega3:0, iod:0, sel:2, mag:21.2, pot:80, fol:0},
{id:"usda_1104913", name:"Flour, pastry, unenriched, unbleached", cat:"Grains", cal:358, pro:8.75, carb:77.2, fat:1.64, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.87, calc:17, zinc:0.74, b12:0, vitD:0, omega3:0, iod:0, sel:5, mag:22.4, pot:142, fol:0},
{id:"usda_1104962", name:"Onions, white, raw", cat:"Vegetables", cal:35, pro:0.89, carb:7.68, fat:0.13, fib:1.2, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.15, calc:21, zinc:0.12, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:9.3, pot:141, fol:0},
{id:"usda_1105073", name:"Bananas, overripe, raw", cat:"Fruit", cal:85, pro:0.73, carb:20.1, fat:0.22, fib:1.7, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0, calc:0, zinc:0, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:0, pot:0, fol:25},
{id:"usda_1105314", name:"Bananas, ripe and slightly ripe, raw", cat:"Fruit", cal:97, pro:0.74, carb:23, fat:0.29, fib:1.7, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0, calc:5, zinc:0.16, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:28, pot:326, fol:14},
{id:"usda_1750339", name:"Apples, red delicious, with skin, raw", cat:"Fruit", cal:0, pro:0.188, carb:14.8, fat:0.212, fib:2.04, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0, calc:4.66, zinc:0.02, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:4.7, pot:95.3, fol:0},
{id:"usda_1750340", name:"Apples, fuji, with skin, raw", cat:"Fruit", cal:0, pro:0.148, carb:15.7, fat:0.162, fib:2.08, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.015, calc:5.98, zinc:0.017, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:4.67, pot:104, fol:0},
{id:"usda_1750341", name:"Apples, gala, with skin, raw", cat:"Fruit", cal:0, pro:0.133, carb:14.8, fat:0.15, fib:2.11, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.06, calc:6.64, zinc:0.024, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:4.95, pot:106, fol:0.812},
{id:"usda_1750342", name:"Apples, granny smith, with skin, raw", cat:"Fruit", cal:0, pro:0.266, carb:14.1, fat:0.138, fib:2.51, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.07, calc:5.48, zinc:0.023, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:5.06, pot:116, fol:0},
{id:"usda_1750343", name:"Apples, honeycrisp, with skin, raw", cat:"Fruit", cal:0, pro:0.102, carb:14.7, fat:0.1, fib:1.72, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0, calc:3.87, zinc:0.018, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:4.15, pot:98, fol:0},
{id:"usda_1750348", name:"Oil, peanut", cat:"Fats & Oils", cal:0, pro:0, carb:0, fat:0, fib:0, fibSol:0, fibInsol:0, fatSat:16.2, fatMufa:57.1, fatPufa:19.9, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0, calc:0, zinc:0, b12:0, vitD:0, omega3:0.318, iod:0, sel:0, mag:0, pot:0, fol:0},
{id:"usda_1750349", name:"Oil, sunflower", cat:"Fats & Oils", cal:0, pro:0, carb:0, fat:0, fib:0, fibSol:0, fibInsol:0, fatSat:8.99, fatMufa:63.4, fatPufa:20.7, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0, calc:0, zinc:0, b12:0, vitD:0, omega3:0.163, iod:0, sel:0, mag:0, pot:0, fol:0},
{id:"usda_1750350", name:"Oil, safflower", cat:"Fats & Oils", cal:0, pro:0, carb:0, fat:0, fib:0, fibSol:0, fibInsol:0, fatSat:7.65, fatMufa:71.6, fatPufa:13.8, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0, calc:0, zinc:0, b12:0, vitD:0, omega3:0.15, iod:0, sel:0, mag:0, pot:0, fol:0},
{id:"usda_1750351", name:"Oil, olive, extra light", cat:"Fats & Oils", cal:0, pro:0, carb:0, fat:0, fib:0, fibSol:0, fibInsol:0, fatSat:15.8, fatMufa:66.6, fatPufa:10.4, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0, calc:0, zinc:0, b12:0, vitD:0, omega3:0.607, iod:0, sel:0, mag:0, pot:0, fol:0},
{id:"usda_1999626", name:"Mushroom, lion's mane", cat:"Vegetables", cal:0, pro:2.5, carb:7.59, fat:0.256, fib:4.38, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0.449, aaIle:0.748, aaLeu:1.33, aaLys:1.2, aaMet:0.267, aaPhe:0.703, aaThr:0.899, aaTrp:0.326, aaVal:1.64, iron:0.688, calc:0, zinc:0.745, b12:0, vitD:0.021, omega3:0, iod:0, sel:1.77, mag:11.7, pot:443, fol:29.6},
{id:"usda_1999627", name:"Mushroom, oyster", cat:"Vegetables", cal:0, pro:2.9, carb:6.94, fat:0.188, fib:2.85, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0.574, aaIle:0.923, aaLeu:1.51, aaLys:1.33, aaMet:0.356, aaPhe:0.989, aaThr:1.17, aaTrp:0.381, aaVal:1.65, iron:0.698, calc:0, zinc:0.684, b12:0, vitD:0.041, omega3:0, iod:0, sel:1.38, mag:13.9, pot:282, fol:63.1},
{id:"usda_1999628", name:"Mushrooms, shiitake", cat:"Vegetables", cal:0, pro:2.41, carb:8.17, fat:0.195, fib:4.17, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0.439, aaIle:0.786, aaLeu:1.31, aaLys:1.17, aaMet:0.273, aaPhe:0.787, aaThr:0.991, aaTrp:0.288, aaVal:1.64, iron:0.144, calc:0.766, zinc:0.764, b12:0, vitD:0.056, omega3:0, iod:0, sel:1.24, mag:14.1, pot:243, fol:32.1},
{id:"usda_1999629", name:"Mushrooms, white button", cat:"Vegetables", cal:0, pro:2.89, carb:4.08, fat:0.371, fib:1.72, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0.655, aaIle:1.15, aaLeu:1.88, aaLys:1.7, aaMet:0.37, aaPhe:1.12, aaThr:1.41, aaTrp:0.477, aaVal:2.48, iron:0.227, calc:5.46, zinc:0.511, b12:0, vitD:0.022, omega3:0, iod:0, sel:20, mag:10.2, pot:373, fol:34.8},
{id:"usda_1999630", name:"Soy milk, unsweetened, plain, shelf stable", cat:"Legumes", cal:0, pro:3.55, carb:1.29, fat:2.12, fib:0, fibSol:0, fibInsol:0, fatSat:0.314, fatMufa:0.416, fatPufa:1.15, aaHis:0.098, aaIle:0.145, aaLeu:0.249, aaLys:0.221, aaMet:0.046, aaPhe:0.175, aaThr:0.128, aaTrp:0.046, aaVal:0.142, iron:0.542, calc:101, zinc:0.312, b12:0.393, vitD:0.681, omega3:0.166, iod:0, sel:1.94, mag:21.5, pot:158, fol:19.7},
{id:"usda_1999631", name:"Almond milk, unsweetened, plain, shelf stable", cat:"Beverages", cal:0, pro:0.555, carb:0.337, fat:1.22, fib:0, fibSol:0, fibInsol:0, fatSat:0.104, fatMufa:0.729, fatPufa:0.276, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.29, calc:173, zinc:0.172, b12:0.338, vitD:0.927, omega3:0.001, iod:0, sel:0, mag:6.78, pot:30.8, fol:0},
{id:"usda_1999632", name:"Spinach, baby", cat:"Vegetables", cal:0, pro:2.85, carb:2.41, fat:0.619, fib:1.56, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:1.26, calc:68.4, zinc:0.447, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:92.9, pot:582, fol:116},
{id:"usda_1999633", name:"Spinach, mature", cat:"Vegetables", cal:0, pro:2.91, carb:2.64, fat:0.604, fib:1.59, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:1.05, calc:66.6, zinc:0.423, b12:0, vitD:0, omega3:0, iod:6.09, sel:0, mag:93, pot:460, fol:113},
{id:"usda_1999634", name:"Tomato, roma", cat:"Vegetables", cal:0, pro:0.696, carb:3.84, fat:0.425, fib:0.971, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.103, calc:9.96, zinc:0.082, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:8.09, pot:193, fol:9.99},
{id:"usda_2003586", name:"Flour, 00", cat:"Grains", cal:0, pro:11.4, carb:74.4, fat:1.52, fib:2.66, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.986, calc:18.7, zinc:0.791, b12:0, vitD:0, omega3:0, iod:0, sel:10.3, mag:25.8, pot:136, fol:13.5},
{id:"usda_2003587", name:"Flour, spelt, whole grain", cat:"Grains", cal:0, pro:14.5, carb:70.7, fat:2.54, fib:9.34, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:3.77, calc:30, zinc:3.59, b12:0, vitD:0, omega3:0, iod:0, sel:9.48, mag:124, pot:350, fol:38.4},
{id:"usda_2003588", name:"Flour, semolina, coarse and semi-coarse", cat:"Grains", cal:0, pro:11.7, carb:73.8, fat:1.6, fib:3.22, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:1.55, calc:17.2, zinc:0.947, b12:0, vitD:0, omega3:0, iod:0, sel:29.8, mag:35.2, pot:174, fol:168},
{id:"usda_2003589", name:"Flour, semolina, fine", cat:"Grains", cal:0, pro:13.3, carb:72, fat:1.84, fib:3.68, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:2.43, calc:19.8, zinc:1.24, b12:0, vitD:0, omega3:0, iod:0, sel:44.1, mag:46.3, pot:208, fol:164},
{id:"usda_2003590", name:"Apple juice, with added vitamin C, from concentrate, shelf stable", cat:"Fruit", cal:0, pro:0.086, carb:11.4, fat:0.286, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.04, calc:7.1, zinc:0.002, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:4.86, pot:95.9, fol:3.09},
{id:"usda_2003591", name:"Orange juice, no pulp, not fortified, from concentrate, refrigerated", cat:"Fruit", cal:0, pro:0.734, carb:10.3, fat:0.325, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.065, calc:12.8, zinc:0.032, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:10.6, pot:180, fol:29.8},
{id:"usda_2003592", name:"Grape juice, purple, with added vitamin C, from concentrate, shelf stable", cat:"Fruit", cal:0, pro:0.258, carb:15.6, fat:0.288, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.041, calc:9.74, zinc:0.057, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:7.87, pot:49.8, fol:0.664},
{id:"usda_2003593", name:"Grape juice, white, with added vitamin C, from concentrate, shelf stable", cat:"Fruit", cal:0, pro:0.094, carb:15.8, fat:0.265, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.119, calc:7.32, zinc:0.018, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:4.27, pot:49, fol:1.73},
{id:"usda_2003594", name:"Cranberry juice, not fortified, from concentrate, shelf stable", cat:"Fruit", cal:0, pro:0, carb:7.26, fat:0.338, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.126, calc:6.64, zinc:0.041, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:4.38, pot:70.6, fol:8.97},
{id:"usda_2003595", name:"Grapefruit juice, red, not fortified, not from concentrate, refrigerated", cat:"Fruit", cal:0, pro:0.57, carb:9.1, fat:0.267, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.015, calc:8.88, zinc:0.027, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:7.75, pot:128, fol:19},
{id:"usda_2003596", name:"Tomato juice, with added ingredients, from concentrate, shelf stable", cat:"Vegetables", cal:0, pro:0.859, carb:4.32, fat:0.288, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.299, calc:9.74, zinc:0.104, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:10.4, pot:198, fol:18.9},
{id:"usda_2003597", name:"Orange juice, no pulp, not fortified, not from concentrate, refrigerated", cat:"Fruit", cal:0, pro:0.812, carb:10, fat:0.356, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.071, calc:9.29, zinc:0.032, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:10.3, pot:183, fol:29},
{id:"usda_2003598", name:"Mushroom, portabella", cat:"Vegetables", cal:0, pro:2.75, carb:4.66, fat:0.312, fib:1.88, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0.562, aaIle:1.01, aaLeu:1.63, aaLys:1.46, aaMet:0.347, aaPhe:1.02, aaThr:1.21, aaTrp:0.407, aaVal:2.16, iron:0.139, calc:3.24, zinc:0.389, b12:0, vitD:0, omega3:0, iod:0, sel:14.7, mag:9.04, pot:349, fol:0},
{id:"usda_2003599", name:"Mushroom, king oyster", cat:"Vegetables", cal:0, pro:2.41, carb:8.5, fat:0.308, fib:3.01, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0.415, aaIle:0.758, aaLeu:1.2, aaLys:1.18, aaMet:0.303, aaPhe:0.743, aaThr:0.851, aaTrp:0.319, aaVal:1.33, iron:0.338, calc:0, zinc:0.625, b12:0, vitD:0.07, omega3:0, iod:0, sel:1.2, mag:13.5, pot:294, fol:0},
{id:"usda_2003600", name:"Mushroom, enoki", cat:"Vegetables", cal:0, pro:2.42, carb:8.14, fat:0.245, fib:2.94, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0.472, aaIle:0.643, aaLeu:1.05, aaLys:0.925, aaMet:0.19, aaPhe:0.819, aaThr:0.784, aaTrp:0.268, aaVal:1.35, iron:1.28, calc:1.43, zinc:0.482, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:12.8, pot:402, fol:0},
{id:"usda_2003601", name:"Mushroom, crimini", cat:"Vegetables", cal:0, pro:3.09, carb:4.01, fat:0.197, fib:1.78, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0.683, aaIle:1.24, aaLeu:2, aaLys:1.83, aaMet:0.404, aaPhe:1.24, aaThr:1.44, aaTrp:0.497, aaVal:2.32, iron:0.312, calc:4.1, zinc:0.512, b12:0, vitD:0, omega3:0, iod:0, sel:15.3, mag:10.2, pot:380, fol:0},
{id:"usda_2003602", name:"Mushroom, maitake", cat:"Vegetables", cal:0, pro:2.2, carb:6.6, fat:0.265, fib:3.07, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0.907, aaIle:1.57, aaLeu:2.52, aaLys:2.21, aaMet:0.313, aaPhe:1.62, aaThr:1.81, aaTrp:0.371, aaVal:2.82, iron:0.209, calc:0, zinc:0.763, b12:0, vitD:1.6, omega3:0, iod:0, sel:3.27, mag:11, pot:260, fol:0},
{id:"usda_2003603", name:"Mushroom, beech", cat:"Vegetables", cal:0, pro:2.18, carb:6.76, fat:0.449, fib:3.14, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0.429, aaIle:0.651, aaLeu:1.08, aaLys:1.03, aaMet:0.196, aaPhe:0.671, aaThr:0.826, aaTrp:0.299, aaVal:1.29, iron:0.739, calc:0.432, zinc:0.498, b12:0, vitD:0.37, omega3:0, iod:0, sel:0.38, mag:10.5, pot:376, fol:0},
{id:"usda_2003604", name:"Mushroom, pioppini", cat:"Vegetables", cal:0, pro:3.5, carb:5.76, fat:0.24, fib:2.75, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0.689, aaIle:1.25, aaLeu:1.99, aaLys:1.76, aaMet:0.384, aaPhe:1.14, aaThr:1.5, aaTrp:0.489, aaVal:2.14, iron:0.486, calc:0, zinc:0.857, b12:0, vitD:0, omega3:0, iod:0, sel:4.12, mag:16, pot:392, fol:0},
{id:"usda_2257044", name:"Soy milk, sweetened, plain, refrigerated", cat:"Legumes", cal:0, pro:2.78, carb:3, fat:1.96, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0.1, aaIle:0.1, aaLeu:0.2, aaLys:0.2, aaMet:0.033, aaPhe:0.157, aaThr:0.1, aaTrp:0.034, aaVal:0.101, iron:0.367, calc:155, zinc:0.264, b12:1.33, vitD:4.63, omega3:0, iod:0, sel:0, mag:17.5, pot:118, fol:15.8},
{id:"usda_2257045", name:"Almond milk, unsweetened, plain, refrigerated", cat:"Beverages", cal:0, pro:0.656, carb:0.671, fat:1.56, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0.014, aaIle:0.026, aaLeu:0.046, aaLys:0.031, aaMet:0.001, aaPhe:0.043, aaThr:0.01, aaTrp:0.001, aaVal:0.018, iron:0.125, calc:158, zinc:0.077, b12:0.449, vitD:1.59, omega3:0, iod:0, sel:0, mag:8.25, pot:49.3, fol:0},
{id:"usda_2257046", name:"Oat milk, unsweetened, plain, refrigerated", cat:"Beverages", cal:0, pro:0.797, carb:5.1, fat:2.75, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0.018, aaIle:0.025, aaLeu:0.081, aaLys:0.061, aaMet:0.01, aaPhe:0.072, aaThr:0.022, aaTrp:0.009, aaVal:0.033, iron:0.261, calc:148, zinc:0.091, b12:0.506, vitD:1.7, omega3:0, iod:0, sel:0, mag:5.91, pot:148, fol:0},
{id:"usda_2258586", name:"Carrots, mature, raw", cat:"Vegetables", cal:0, pro:0.941, carb:10.3, fat:0.351, fib:3.1, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.15, calc:30.5, zinc:0.236, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:12.4, pot:280, fol:37.1},
{id:"usda_2258587", name:"Carrots, baby, raw", cat:"Vegetables", cal:0, pro:0.805, carb:9.08, fat:0.138, fib:2.69, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.088, calc:42.2, zinc:0.16, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:11.1, pot:237, fol:43.6},
{id:"usda_2258588", name:"Peppers, bell, green, raw", cat:"Vegetables", cal:0, pro:0.715, carb:4.78, fat:0.106, fib:0.942, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.186, calc:7.5, zinc:0.126, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:9, pot:163, fol:22.2},
{id:"usda_2258589", name:"Peppers, bell, yellow, raw", cat:"Vegetables", cal:0, pro:0.819, carb:6.6, fat:0.121, fib:1.07, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.36, calc:6.69, zinc:0.193, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:10.3, pot:197, fol:41.6},
{id:"usda_2258590", name:"Peppers, bell, red, raw", cat:"Vegetables", cal:0, pro:0.896, carb:6.65, fat:0.126, fib:1.16, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.353, calc:6.36, zinc:0.202, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:11, pot:213, fol:47.3},
{id:"usda_2258591", name:"Peppers, bell, orange, raw", cat:"Vegetables", cal:0, pro:0.882, carb:6.7, fat:0.156, fib:0.967, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.365, calc:4.9, zinc:0.242, b12:0, vitD:0, omega3:0, iod:0, sel:0.3, mag:10.4, pot:201, fol:0},
{id:"usda_2259792", name:"Buttermilk, low fat", cat:"Dairy & Eggs", cal:0, pro:3.46, carb:4.81, fat:1.08, fib:0, fibSol:0, fibInsol:0, fatSat:0.552, fatMufa:0.199, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.013, calc:120, zinc:0.426, b12:0, vitD:0.543, omega3:0, iod:34.2, sel:0, mag:11, pot:158, fol:0},
{id:"usda_2259793", name:"Yogurt, plain, whole milk", cat:"Dairy & Eggs", cal:0, pro:3.82, carb:5.57, fat:4.48, fib:0, fibSol:0, fibInsol:0, fatSat:2.32, fatMufa:0.874, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0, calc:127, zinc:0.428, b12:0, vitD:0.778, omega3:0, iod:32.3, sel:0, mag:11.4, pot:164, fol:0},
{id:"usda_2259794", name:"Yogurt, Greek, plain, whole milk", cat:"Dairy & Eggs", cal:0, pro:8.78, carb:4.75, fat:4.39, fib:0, fibSol:0, fibInsol:0, fatSat:2.39, fatMufa:0.958, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0, calc:111, zinc:0.473, b12:0, vitD:0, omega3:0, iod:42.3, sel:0, mag:10.7, pot:147, fol:0},
{id:"usda_2259795", name:"Cheese, parmesan, grated, refrigerated", cat:"Dairy & Eggs", cal:0, pro:30.1, carb:4.33, fat:29.5, fib:0, fibSol:0, fibInsol:0, fatSat:17.2, fatMufa:6.02, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.14, calc:950, zinc:4.62, b12:0, vitD:0, omega3:0, iod:82.9, sel:0, mag:35.4, pot:74, fol:0},
{id:"usda_2259796", name:"Cheese, feta, whole milk, crumbled", cat:"Dairy & Eggs", cal:0, pro:19.7, carb:5.58, fat:19.1, fib:0, fibSol:0, fibInsol:0, fatSat:11.2, fatMufa:4.18, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.068, calc:371, zinc:2.35, b12:0, vitD:0, omega3:0, iod:48.4, sel:0, mag:17.7, pot:105, fol:0},
{id:"usda_2261420", name:"Flour, almond", cat:"Nuts & Seeds", cal:0, pro:26.2, carb:16.2, fat:50.2, fib:9.27, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:3.22, calc:232, zinc:2.8, b12:0, vitD:0, omega3:0, iod:0, sel:0.742, mag:251, pot:667, fol:37.8},
{id:"usda_2261421", name:"Flour, oat, whole grain", cat:"Grains", cal:0, pro:13.2, carb:69.9, fat:6.31, fib:10.5, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:4, calc:42.8, zinc:2.75, b12:0, vitD:0, omega3:0, iod:0, sel:38.2, mag:125, pot:373, fol:34.7},
{id:"usda_2261422", name:"Flour, potato", cat:"Vegetables", cal:0, pro:8.11, carb:79.9, fat:0.951, fib:5.4, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:12, calc:44.1, zinc:0.9, b12:0, vitD:0, omega3:0, iod:0, sel:1.42, mag:73.6, pot:1270, fol:41.2},
{id:"usda_2262072", name:"Peanut butter, creamy", cat:"Legumes", cal:0, pro:24, carb:22.7, fat:49.4, fib:6.32, fibSol:0, fibInsol:0, fatSat:8.42, fatMufa:30.7, fatPufa:9.78, aaHis:0.676, aaIle:0.92, aaLeu:1.88, aaLys:0.951, aaMet:0.29, aaPhe:1.5, aaThr:0.806, aaTrp:0.229, aaVal:1.12, iron:1.85, calc:49.8, zinc:3.06, b12:0, vitD:0, omega3:0, iod:0, sel:20.2, mag:193, pot:654, fol:97.3},
{id:"usda_2262073", name:"Sesame butter, creamy", cat:"Nuts & Seeds", cal:0, pro:19.7, carb:14.2, fat:62.4, fib:8.37, fibSol:0, fibInsol:0, fatSat:8.97, fatMufa:22.6, fatPufa:26.4, aaHis:0.618, aaIle:0.859, aaLeu:1.65, aaLys:0.672, aaMet:0.739, aaPhe:1.12, aaThr:0.916, aaTrp:0.309, aaVal:1.1, iron:7, calc:116, zinc:6.04, b12:0, vitD:0, omega3:0.25, iod:0, sel:46.5, mag:357, pot:408, fol:108},
{id:"usda_2262074", name:"Almond butter, creamy", cat:"Nuts & Seeds", cal:0, pro:20.8, carb:21.2, fat:53, fib:9.72, fibSol:0, fibInsol:0, fatSat:4.25, fatMufa:34.7, fatPufa:12.6, aaHis:0.639, aaIle:0.93, aaLeu:1.75, aaLys:0.646, aaMet:0.189, aaPhe:1.38, aaThr:0.779, aaTrp:0.196, aaVal:1.09, iron:4.11, calc:264, zinc:3.18, b12:0, vitD:0, omega3:0, iod:0, sel:0.794, mag:268, pot:745, fol:42.5},
{id:"usda_2262075", name:"Flaxseed, ground", cat:"Nuts & Seeds", cal:0, pro:18, carb:34.4, fat:37.3, fib:23.1, fibSol:0, fibInsol:0, fatSat:3.28, fatMufa:5.94, fatPufa:24.7, aaHis:0.514, aaIle:0.938, aaLeu:1.38, aaLys:0.932, aaMet:0.402, aaPhe:1.12, aaThr:0.931, aaTrp:0.301, aaVal:1.14, iron:5.78, calc:230, zinc:4.74, b12:0, vitD:0, omega3:19.4, iod:0, sel:136, mag:372, pot:793, fol:41.4},
{id:"usda_2346384", name:"Cottage cheese, full fat, large or small curd", cat:"Dairy & Eggs", cal:0, pro:11.6, carb:4.6, fat:4.22, fib:0, fibSol:0, fibInsol:0, fatSat:2.6, fatMufa:0.916, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0, calc:88.3, zinc:0.454, b12:0.662, vitD:0, omega3:0, iod:45.7, sel:0, mag:9.19, pot:124, fol:0},
{id:"usda_2346385", name:"Cream cheese, full fat, block", cat:"Dairy & Eggs", cal:0, pro:5.79, carb:4.56, fat:33.5, fib:0, fibSol:0, fibInsol:0, fatSat:19.7, fatMufa:6.92, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0, calc:97.1, zinc:0.589, b12:0, vitD:0, omega3:0, iod:34.9, sel:0, mag:8.91, pot:125, fol:0},
{id:"usda_2346386", name:"Cream, heavy", cat:"Dairy & Eggs", cal:0, pro:2.02, carb:3.8, fat:35.6, fib:0, fibSol:0, fibInsol:0, fatSat:20.4, fatMufa:7.34, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0, calc:61.2, zinc:0.223, b12:0, vitD:0, omega3:0, iod:19.4, sel:0, mag:5.97, pot:96.9, fol:0},
{id:"usda_2346387", name:"Cream, sour, full fat", cat:"Dairy & Eggs", cal:0, pro:3.07, carb:5.56, fat:18, fib:0, fibSol:0, fibInsol:0, fatSat:10.7, fatMufa:3.8, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0, calc:107, zinc:0.392, b12:0.062, vitD:0, omega3:0, iod:32.8, sel:0, mag:10.1, pot:154, fol:0},
{id:"usda_2346388", name:"Lettuce, iceberg, raw", cat:"Vegetables", cal:0, pro:0.742, carb:3.37, fat:0.074, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.033, calc:14.2, zinc:0.173, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:6.31, pot:139, fol:0},
{id:"usda_2346389", name:"Lettuce, romaine, green, raw", cat:"Vegetables", cal:0, pro:0.977, carb:4.06, fat:0.071, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.267, calc:27.6, zinc:0.252, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:12, pot:260, fol:0},
{id:"usda_2346390", name:"Lettuce, leaf, red, raw", cat:"Vegetables", cal:0, pro:0.883, carb:3.26, fat:0.106, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.402, calc:42.6, zinc:0.303, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:12.4, pot:321, fol:0},
{id:"usda_2346391", name:"Lettuce, leaf, green, raw", cat:"Vegetables", cal:0, pro:1.09, carb:4.07, fat:0.156, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.32, calc:39.8, zinc:0.31, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:12.8, pot:277, fol:0},
{id:"usda_2346392", name:"Nuts, pine nuts, raw", cat:"Nuts & Seeds", cal:0, pro:15.7, carb:18.6, fat:61.3, fib:3.94, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0.37, aaIle:0.567, aaLeu:1.1, aaLys:0.587, aaMet:0.33, aaPhe:0.593, aaThr:0.467, aaTrp:0.147, aaVal:0.737, iron:5.36, calc:8.74, zinc:5.71, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:206, pot:655, fol:0},
{id:"usda_2346393", name:"Nuts, almonds, whole, raw", cat:"Nuts & Seeds", cal:0, pro:21.5, carb:20, fat:51.1, fib:10.8, fibSol:0, fibInsol:0, fatSat:3.78, fatMufa:31.3, fatPufa:11.2, aaHis:0.548, aaIle:0.774, aaLeu:1.49, aaLys:0.618, aaMet:0.154, aaPhe:1.2, aaThr:0.608, aaTrp:0.208, aaVal:0.916, iron:3.74, calc:254, zinc:2.86, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:258, pot:733, fol:0},
{id:"usda_2346394", name:"Nuts, walnuts, English, halves, raw", cat:"Nuts & Seeds", cal:0, pro:14.6, carb:10.9, fat:69.7, fib:5.21, fibSol:0, fibInsol:0, fatSat:6.05, fatMufa:9.62, fatPufa:49.3, aaHis:0.343, aaIle:0.52, aaLeu:0.997, aaLys:0.38, aaMet:0.19, aaPhe:0.607, aaThr:0.443, aaTrp:0.127, aaVal:0.597, iron:2.24, calc:88.3, zinc:2.76, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:142, pot:424, fol:0},
{id:"usda_2346395", name:"Nuts, pecans, halves, raw", cat:"Nuts & Seeds", cal:0, pro:9.96, carb:12.7, fat:73.3, fib:5.79, fibSol:0, fibInsol:0, fatSat:6.46, fatMufa:39.3, fatPufa:22.9, aaHis:0.262, aaIle:0.365, aaLeu:0.67, aaLys:0.32, aaMet:0.168, aaPhe:0.462, aaThr:0.302, aaTrp:0.115, aaVal:0.435, iron:2.37, calc:54.8, zinc:3.93, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:103, pot:360, fol:0},
{id:"usda_2346396", name:"Oats, whole grain, rolled, old fashioned", cat:"Grains", cal:0, pro:13.5, carb:68.7, fat:5.89, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:4.34, calc:45.5, zinc:2.74, b12:0, vitD:0, omega3:0, iod:0, sel:25.4, mag:126, pot:350, fol:32},
{id:"usda_2346397", name:"Oats, whole grain, steel cut", cat:"Grains", cal:0, pro:12.5, carb:69.8, fat:5.8, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:3.8, calc:51.3, zinc:2.84, b12:0, vitD:0, omega3:0, iod:0, sel:29, mag:129, pot:376, fol:30},
{id:"usda_2346398", name:"Pineapple, raw", cat:"Fruit", cal:0, pro:0.461, carb:14.1, fat:0.211, fib:0.935, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.054, calc:12.5, zinc:0.107, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:13.4, pot:137, fol:0},
{id:"usda_2346399", name:"Cherries, sweet, dark red, raw", cat:"Fruit", cal:0, pro:1.04, carb:16.2, fat:0.192, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.105, calc:12.3, zinc:0.065, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:12.1, pot:230, fol:0},
{id:"usda_2346400", name:"Beans, snap, green, raw", cat:"Vegetables", cal:0, pro:1.97, carb:7.41, fat:0.275, fib:3.01, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.652, calc:40, zinc:0.35, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:28.2, pot:290, fol:0},
{id:"usda_2346401", name:"Potatoes, russet, without skin, raw", cat:"Vegetables", cal:0, pro:2.27, carb:17.8, fat:0.36, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.384, calc:7.8, zinc:0.378, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:25.6, pot:450, fol:0},
{id:"usda_2346402", name:"Potatoes, red, without skin, raw", cat:"Vegetables", cal:0, pro:2.06, carb:16.3, fat:0.248, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.391, calc:5.13, zinc:0.392, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:23.6, pot:472, fol:0},
{id:"usda_2346403", name:"Potatoes, gold, without skin, raw", cat:"Vegetables", cal:0, pro:1.81, carb:16, fat:0.264, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.373, calc:5.94, zinc:0.374, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:22.3, pot:446, fol:0},
{id:"usda_2346404", name:"Sweet potatoes, orange flesh, without skin, raw", cat:"Vegetables", cal:0, pro:1.58, carb:17.3, fat:0.375, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.398, calc:22.3, zinc:0.337, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:19.1, pot:486, fol:0},
{id:"usda_2346405", name:"Celery, raw", cat:"Vegetables", cal:0, pro:0.492, carb:3.32, fat:0.162, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0, calc:46.3, zinc:0.093, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:10.9, pot:265, fol:0},
{id:"usda_2346406", name:"Cucumber, with peel, raw", cat:"Vegetables", cal:0, pro:0.625, carb:2.95, fat:0.178, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0, calc:16.3, zinc:0.204, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:10.1, pot:170, fol:0},
{id:"usda_2346407", name:"Cabbage, green, raw", cat:"Vegetables", cal:0, pro:0.961, carb:6.38, fat:0.228, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.066, calc:41.8, zinc:0.211, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:13.9, pot:207, fol:0},
{id:"usda_2346408", name:"Cabbage, red, raw", cat:"Vegetables", cal:0, pro:1.24, carb:6.79, fat:0.214, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0, calc:31, zinc:0.245, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:13.3, pot:269, fol:0},
{id:"usda_2346409", name:"Strawberries, raw", cat:"Fruit", cal:0, pro:0.641, carb:7.96, fat:0.22, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.255, calc:16.9, zinc:0.114, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:12.5, pot:161, fol:0},
{id:"usda_2346410", name:"Raspberries, raw", cat:"Fruit", cal:0, pro:1.01, carb:12.9, fat:0.188, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.45, calc:16.4, zinc:0.221, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:19.2, pot:156, fol:0},
{id:"usda_2346411", name:"Blueberries, raw", cat:"Fruit", cal:0, pro:0.703, carb:14.6, fat:0.306, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.34, calc:11.7, zinc:0.085, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:6.18, pot:85.6, fol:0},
{id:"usda_2346412", name:"Grapes, red, seedless, raw", cat:"Fruit", cal:0, pro:0.914, carb:20.2, fat:0.164, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.162, calc:10.2, zinc:0.036, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:8.56, pot:229, fol:0},
{id:"usda_2346413", name:"Grapes, green, seedless, raw", cat:"Fruit", cal:0, pro:0.899, carb:18.6, fat:0.232, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.199, calc:9.9, zinc:0.027, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:7.12, pot:218, fol:0},
{id:"usda_2346414", name:"Applesauce, unsweetened, with added vitamin C", cat:"Fruit", cal:0, pro:0.273, carb:12.3, fat:0.162, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.045, calc:3.82, zinc:0.003, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:3.94, pot:108, fol:0},
{id:"usda_2512371", name:"Flour, amaranth", cat:"Grains", cal:0, pro:13.2, carb:68.8, fat:6.24, fib:7.21, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:7.56, calc:135, zinc:3, b12:0, vitD:0, omega3:0, iod:0, sel:21.1, mag:233, pot:396, fol:0},
{id:"usda_2512372", name:"Flour, quinoa", cat:"Grains", cal:0, pro:11.9, carb:69.5, fat:6.6, fib:6.3, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:4.53, calc:37.6, zinc:2.77, b12:0, vitD:0, omega3:0, iod:0, sel:4.1, mag:164, pot:551, fol:0},
{id:"usda_2512373", name:"Flour, sorghum", cat:"Grains", cal:0, pro:8.27, carb:77.4, fat:3.59, fib:6.02, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:3.72, calc:11.4, zinc:1.66, b12:0, vitD:0, omega3:0, iod:0, sel:12.4, mag:116, pot:335, fol:0},
{id:"usda_2512374", name:"Flour, buckwheat", cat:"Grains", cal:0, pro:8.88, carb:75, fat:2.48, fib:10.4, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:3.84, calc:30.6, zinc:1.76, b12:0, vitD:0, omega3:0, iod:0, sel:15.7, mag:167, pot:378, fol:0},
{id:"usda_2512375", name:"Flour, rye", cat:"Grains", cal:0, pro:8.4, carb:77.2, fat:1.91, fib:13.7, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:2.54, calc:32.2, zinc:2.33, b12:0, vitD:0, omega3:0, iod:0, sel:16.6, mag:95.4, pot:434, fol:0},
{id:"usda_2512376", name:"Flour, barley", cat:"Grains", cal:0, pro:8.72, carb:77.4, fat:2.45, fib:12.8, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:3.3, calc:35.6, zinc:2.14, b12:0, vitD:0, omega3:0, iod:0, sel:13.1, mag:88, pot:367, fol:0},
{id:"usda_2512377", name:"Flour, cassava", cat:"Vegetables", cal:0, pro:0.918, carb:87.3, fat:0.494, fib:4.83, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:3.99, calc:74.6, zinc:0.41, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:33.6, pot:198, fol:0},
{id:"usda_2512378", name:"Buckwheat, whole grain", cat:"Grains", cal:0, pro:11.1, carb:71.1, fat:3.04, fib:4.05, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:2.44, calc:13.6, zinc:2.24, b12:0, vitD:0, omega3:0, iod:0, sel:13.6, mag:203, pot:414, fol:0},
{id:"usda_2512379", name:"Millet, whole grain", cat:"Grains", cal:0, pro:10, carb:74.4, fat:4.19, fib:2.62, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:2.53, calc:9.1, zinc:2.26, b12:0, vitD:0, omega3:0, iod:0, sel:23.1, mag:106, pot:214, fol:0},
{id:"usda_2512380", name:"Rice, brown, long grain, unenriched, raw", cat:"Grains", cal:0, pro:7.25, carb:76.7, fat:3.31, fib:3.02, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:1.24, calc:8.06, zinc:1.85, b12:0, vitD:0, omega3:0, iod:0, sel:14.8, mag:115, pot:250, fol:0},
{id:"usda_2512381", name:"Rice, white, long grain, unenriched, raw", cat:"Grains", cal:0, pro:7.04, carb:80.3, fat:1.03, fib:0.149, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.14, calc:4.46, zinc:1.35, b12:0, vitD:0, omega3:0, iod:0, sel:6.6, mag:26.5, pot:82.3, fol:0},
{id:"usda_2514743", name:"Beef, ground, 90% lean meat / 10% fat, raw", cat:"Meat", cal:0, pro:18.2, carb:0, fat:12.8, fib:0, fibSol:0, fibInsol:0, fatSat:5.05, fatMufa:4.48, fatPufa:0.361, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:2.13, calc:7.14, zinc:4.19, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:16.5, pot:281, fol:0},
{id:"usda_2514744", name:"Beef, ground, 80% lean meat / 20% fat, raw", cat:"Meat", cal:0, pro:17.5, carb:0, fat:19.4, fib:0, fibSol:0, fibInsol:0, fatSat:6.84, fatMufa:7.25, fatPufa:0.485, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:1.96, calc:6.89, zinc:3.85, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:16.4, pot:273, fol:0},
{id:"usda_2514745", name:"Pork, ground, raw", cat:"Meat", cal:0, pro:17.8, carb:0, fat:17.5, fib:0, fibSol:0, fibInsol:0, fatSat:6.28, fatMufa:7.78, fatPufa:2.55, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.788, calc:5.86, zinc:2.23, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:19, pot:318, fol:0},
{id:"usda_2514746", name:"Chicken, ground, with additives, raw", cat:"Meat", cal:0, pro:17.9, carb:0, fat:7.16, fib:0, fibSol:0, fibInsol:0, fatSat:1.56, fatMufa:2.17, fatPufa:1.38, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.593, calc:5.82, zinc:1.18, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:20.5, pot:302, fol:0},
{id:"usda_2514747", name:"Turkey, ground, 93% lean/ 7% fat, raw", cat:"Meat", cal:0, pro:17.3, carb:0, fat:9.59, fib:0, fibSol:0, fibInsol:0, fatSat:2.26, fatMufa:2.87, fatPufa:2.59, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:1.09, calc:23.6, zinc:2.95, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:17.3, pot:246, fol:0},
{id:"usda_2515373", name:"Nuts, brazilnuts, raw", cat:"Nuts & Seeds", cal:0, pro:15, carb:21.6, fat:57.4, fib:5.98, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:2.47, calc:168, zinc:3.82, b12:0, vitD:0, omega3:0, iod:0, sel:280, mag:351, pot:592, fol:0},
{id:"usda_2515374", name:"Nuts, cashew nuts, raw", cat:"Nuts & Seeds", cal:0, pro:17.4, carb:36.3, fat:38.9, fib:4.1, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:5.99, calc:42, zinc:5.07, b12:0, vitD:0, omega3:0, iod:0, sel:20.7, mag:251, pot:638, fol:0},
{id:"usda_2515375", name:"Nuts, hazelnuts or filberts, raw", cat:"Nuts & Seeds", cal:0, pro:13.5, carb:26.5, fat:53.5, fib:8.41, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:3.46, calc:135, zinc:2.33, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:156, pot:636, fol:0},
{id:"usda_2515376", name:"Peanuts, raw", cat:"Legumes", cal:0, pro:23.2, carb:26.5, fat:43.3, fib:8.01, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:1.55, calc:49.1, zinc:2.78, b12:0, vitD:0, omega3:0, iod:0, sel:17.8, mag:180, pot:636, fol:0},
{id:"usda_2515377", name:"Flour, chestnut", cat:"Nuts & Seeds", cal:0, pro:5.29, carb:80.5, fat:4.64, fib:8.71, fibSol:0, fibInsol:0, fatSat:0.689, fatMufa:1.26, fatPufa:1.52, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:1.62, calc:55.8, zinc:1.04, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:68.8, pot:1030, fol:0},
{id:"usda_2515378", name:"Nuts, macadamia nuts, raw", cat:"Nuts & Seeds", cal:0, pro:7.79, carb:24.1, fat:64.9, fib:7.56, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:1.88, calc:52.7, zinc:1.2, b12:0, vitD:0, omega3:0, iod:0, sel:32.6, mag:107, pot:373, fol:0},
{id:"usda_2515379", name:"Nuts, pistachio nuts, raw", cat:"Nuts & Seeds", cal:0, pro:20.5, carb:27.7, fat:45, fib:6.97, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:3.46, calc:117, zinc:2.18, b12:0, vitD:0, omega3:0, iod:0, sel:23.1, mag:110, pot:947, fol:0},
{id:"usda_2515380", name:"Seeds, pumpkin seeds (pepitas), raw", cat:"Nuts & Seeds", cal:0, pro:29.9, carb:18.7, fat:40, fib:5.08, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:8.36, calc:37.4, zinc:6.34, b12:0, vitD:0, omega3:0, iod:0, sel:20.5, mag:500, pot:691, fol:0},
{id:"usda_2515381", name:"Seeds, sunflower seed, kernel, raw", cat:"Nuts & Seeds", cal:0, pro:18.9, carb:24.5, fat:48.4, fib:7.22, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:4.37, calc:116, zinc:5.58, b12:0, vitD:0, omega3:0, iod:0, sel:17.8, mag:302, pot:657, fol:0},
{id:"usda_2515382", name:"Flour, coconut", cat:"Nuts & Seeds", cal:0, pro:16.1, carb:58.9, fat:15.3, fib:34.2, fibSol:0, fibInsol:0, fatSat:14, fatMufa:0.806, fatPufa:0.111, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:8.02, calc:36, zinc:3.7, b12:0, vitD:0, omega3:0, iod:0, sel:26.8, mag:248, pot:2090, fol:0},
{id:"usda_2644281", name:"Beans, cannellini, dry", cat:"Legumes", cal:0, pro:21.6, carb:59.8, fat:2.2, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:6.67, calc:143, zinc:2.72, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:154, pot:1420, fol:0},
{id:"usda_2644282", name:"Chickpeas, (garbanzo beans, bengal gram), dry", cat:"Legumes", cal:0, pro:21.3, carb:60.4, fat:6.27, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:5.09, calc:111, zinc:3.12, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:135, pot:1070, fol:0},
{id:"usda_2644283", name:"Lentils, dry", cat:"Legumes", cal:0, pro:23.6, carb:62.2, fat:1.92, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:7.16, calc:61.8, zinc:3.86, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:107, pot:949, fol:0},
{id:"usda_2644284", name:"Blackeye pea, dry", cat:"Legumes", cal:0, pro:21.2, carb:61.8, fat:2.42, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:5.93, calc:71.4, zinc:3.65, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:184, pot:1240, fol:0},
{id:"usda_2644285", name:"Beans, black, canned, sodium added, drained and rinsed", cat:"Legumes", cal:0, pro:6.91, carb:19.8, fat:1.27, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:1.69, calc:43.3, zinc:0.74, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:32.5, pot:253, fol:0},
{id:"usda_2644286", name:"Beans, navy, canned, sodium added, drained and rinsed", cat:"Legumes", cal:0, pro:6.57, carb:20, fat:1.4, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:1.6, calc:63.9, zinc:0.631, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:29.6, pot:184, fol:0},
{id:"usda_2644287", name:"Beans, cannellini, canned, sodium added, drained and rinsed", cat:"Legumes", cal:0, pro:7.41, carb:18.8, fat:1.17, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:1.4, calc:69.2, zinc:0.516, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:29.3, pot:203, fol:0},
{id:"usda_2644288", name:"Chickpeas (garbanzo beans, bengal gram), canned, sodium added, drained and rinsed", cat:"Legumes", cal:0, pro:7.02, carb:20.3, fat:3.1, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:1.04, calc:40.5, zinc:0.724, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:28.4, pot:137, fol:0},
{id:"usda_2644289", name:"Beans, kidney, dark red, canned, sodium added, sugar added, drained and rinsed", cat:"Legumes", cal:0, pro:7.8, carb:21, fat:1.26, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:1.44, calc:56.9, zinc:0.56, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:29.3, pot:227, fol:0},
{id:"usda_2644290", name:"Beans, kidney, light red, canned, sodium added, sugar added, drained and rinsed", cat:"Legumes", cal:0, pro:7.31, carb:21.4, fat:1.3, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:1.3, calc:60.2, zinc:0.526, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:25.5, pot:209, fol:0},
{id:"usda_2644291", name:"Peas, green, sweet, canned, sodium added, sugar added, drained and rinsed", cat:"Vegetables", cal:0, pro:4.73, carb:12.7, fat:1.15, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:1.14, calc:28.2, zinc:0.712, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:21.9, pot:109, fol:0},
{id:"usda_2644292", name:"Beans, pinto, canned, sodium added, drained and rinsed", cat:"Legumes", cal:0, pro:6.69, carb:19.6, fat:1.27, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:1.28, calc:55.2, zinc:0.625, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:27.5, pot:210, fol:0},
{id:"usda_2644293", name:"Blackeye pea, canned, sodium added, drained and rinsed", cat:"Legumes", cal:0, pro:6.92, carb:19.2, fat:1.3, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:1.08, calc:27.8, zinc:0.655, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:27.3, pot:138, fol:0},
{id:"usda_2644294", name:"Beans, great northern, canned, sodium added, drained and rinsed", cat:"Legumes", cal:0, pro:7.03, carb:19.3, fat:1.27, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:1.38, calc:67.2, zinc:0.635, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:29.3, pot:213, fol:0},
{id:"usda_2646168", name:"Pork, loin, boneless, raw", cat:"Meat", cal:0, pro:21.1, carb:0, fat:9.47, fib:0, fibSol:0, fibInsol:0, fatSat:3.28, fatMufa:3.95, fatPufa:1.38, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.452, calc:4.11, zinc:1.57, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:22, pot:361, fol:0},
{id:"usda_2646169", name:"Pork, loin, tenderloin, boneless, raw", cat:"Meat", cal:0, pro:21.6, carb:0, fat:3.9, fib:0, fibSol:0, fibInsol:0, fatSat:0.866, fatMufa:0.862, fatPufa:0.418, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.929, calc:4.53, zinc:1.77, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:24.7, pot:397, fol:0},
{id:"usda_2646170", name:"Chicken, breast, boneless, skinless, raw", cat:"Meat", cal:0, pro:22.5, carb:0, fat:1.93, fib:0, fibSol:0, fibInsol:0, fatSat:0.349, fatMufa:0.369, fatPufa:0.296, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.354, calc:3.94, zinc:0.654, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:26.2, pot:330, fol:0},
{id:"usda_2646171", name:"Chicken, thigh, boneless, skinless, raw", cat:"Meat", cal:0, pro:18.6, carb:0, fat:7.92, fib:0, fibSol:0, fibInsol:0, fatSat:1.66, fatMufa:2.24, fatPufa:1.42, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.602, calc:5.65, zinc:1.35, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:21.8, pot:272, fol:0},
{id:"usda_2646172", name:"Beef, ribeye, steak, boneless, choice, raw", cat:"Meat", cal:0, pro:18.7, carb:0, fat:20, fib:0, fibSol:0, fibInsol:0, fatSat:7.97, fatMufa:7.73, fatPufa:0.629, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:1.64, calc:4.17, zinc:4.06, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:16.7, pot:288, fol:0},
{id:"usda_2646173", name:"Beef, round, top round, boneless, choice, raw", cat:"Meat", cal:0, pro:21.5, carb:0.852, fat:5.7, fib:0, fibSol:0, fibInsol:0, fatSat:1.7, fatMufa:1.7, fatPufa:0.238, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:1.9, calc:4.07, zinc:3.78, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:22.1, pot:352, fol:0},
{id:"usda_2646174", name:"Beef, chuck, roast, boneless, choice, raw", cat:"Meat", cal:0, pro:18.4, carb:0, fat:17.8, fib:0, fibSol:0, fibInsol:0, fatSat:6.34, fatMufa:7.02, fatPufa:0.556, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:2.06, calc:4.58, zinc:5.39, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:17, pot:281, fol:0},
{id:"usda_2646175", name:"Beef, flank, steak, boneless, choice, raw", cat:"Meat", cal:0, pro:20.1, carb:0, fat:9.4, fib:0, fibSol:0, fibInsol:0, fatSat:3.55, fatMufa:3.59, fatPufa:0.314, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:1.83, calc:3.84, zinc:5.56, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:18.9, pot:332, fol:0},
{id:"usda_2647437", name:"Yogurt, plain, nonfat", cat:"Dairy & Eggs", cal:0, pro:4.23, carb:8.08, fat:0.087, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0, calc:167, zinc:0.599, b12:0, vitD:0.217, omega3:0, iod:58.7, sel:0, mag:15.2, pot:210, fol:0},
{id:"usda_2647438", name:"Cheese, monterey jack, solid", cat:"Dairy & Eggs", cal:0, pro:22.6, carb:1.9, fat:32.6, fib:0, fibSol:0, fibInsol:0, fatSat:19.2, fatMufa:6.68, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0, calc:715, zinc:3.78, b12:0, vitD:0, omega3:0, iod:35.9, sel:0, mag:29.6, pot:82.9, fol:0},
{id:"usda_2647439", name:"Cheese, pasteurized process cheese food or product, American, singles", cat:"Dairy & Eggs", cal:0, pro:15.6, carb:8.19, fat:23.9, fib:0, fibSol:0, fibInsol:0, fatSat:13.7, fatMufa:4.89, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:1.3, calc:1500, zinc:2.38, b12:0, vitD:4.42, omega3:0, iod:52.5, sel:0, mag:34.6, pot:212, fol:0},
{id:"usda_2647440", name:"Cheese, provolone, sliced", cat:"Dairy & Eggs", cal:0, pro:23.5, carb:2.45, fat:28.1, fib:0, fibSol:0, fibInsol:0, fatSat:16.2, fatMufa:5.74, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0, calc:749, zinc:3.89, b12:0, vitD:0, omega3:0, iod:64.3, sel:0, mag:29.5, pot:94.8, fol:0},
{id:"usda_2647441", name:"Cheese, oaxaca, solid", cat:"Dairy & Eggs", cal:0, pro:22.1, carb:2.4, fat:22.1, fib:0, fibSol:0, fibInsol:0, fatSat:12.7, fatMufa:4.74, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0, calc:532, zinc:3.51, b12:0, vitD:0, omega3:0, iod:45.7, sel:0, mag:21.6, pot:80.7, fol:0},
{id:"usda_2647442", name:"Cheese, queso fresco, solid", cat:"Dairy & Eggs", cal:0, pro:18.9, carb:2.96, fat:23.4, fib:0, fibSol:0, fibInsol:0, fatSat:14, fatMufa:4.96, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0, calc:602, zinc:2.91, b12:0, vitD:0, omega3:0, iod:79.9, sel:0, mag:27.6, pot:126, fol:0},
{id:"usda_2647443", name:"Cheese, cotija, solid", cat:"Dairy & Eggs", cal:0, pro:23.8, carb:2.72, fat:27.2, fib:0, fibSol:0, fibInsol:0, fatSat:15.9, fatMufa:5.93, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0, calc:700, zinc:3.6, b12:0, vitD:0, omega3:0, iod:64.8, sel:0, mag:29.9, pot:117, fol:0},
{id:"usda_2684440", name:"Fish, salmon, sockeye, wild caught, raw", cat:"Fish & Seafood", cal:0, pro:22.3, carb:0, fat:4.94, fib:0, fibSol:0, fibInsol:0, fatSat:0.722, fatMufa:1.14, fatPufa:0.71, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.402, calc:14.8, zinc:0.425, b12:5.16, vitD:0, omega3:0.021, iod:18.4, sel:30.2, mag:26.2, pot:330, fol:0},
{id:"usda_2684441", name:"Fish, salmon, Atlantic, farm raised, raw", cat:"Fish & Seafood", cal:0, pro:20.3, carb:0, fat:13.1, fib:0, fibSol:0, fibInsol:0, fatSat:2.28, fatMufa:5.01, fatPufa:4.06, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.259, calc:9.42, zinc:0.339, b12:5.7, vitD:0, omega3:0.541, iod:3.24, sel:22.8, mag:25.4, pot:378, fol:0},
{id:"usda_2684442", name:"Fish, tilapia, farm raised, raw", cat:"Fish & Seafood", cal:0, pro:19, carb:0, fat:2.48, fib:0, fibSol:0, fibInsol:0, fatSat:0.647, fatMufa:0.769, fatPufa:0.358, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0, calc:8.63, zinc:0.3, b12:0.759, vitD:0, omega3:0.015, iod:4.14, sel:20.5, mag:24.3, pot:342, fol:0},
{id:"usda_2684443", name:"Crustaceans, shrimp, farm raised, raw", cat:"Fish & Seafood", cal:0, pro:15.6, carb:0.485, fat:0.801, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.522, calc:64.6, zinc:0.937, b12:0.996, vitD:0, omega3:0, iod:13.6, sel:19.5, mag:22.5, pot:146, fol:0},
{id:"usda_2684444", name:"Fish, cod, Atlantic, wild caught, raw", cat:"Fish & Seafood", cal:0, pro:16.1, carb:0, fat:0.668, fib:0, fibSol:0, fibInsol:0, fatSat:0.044, fatMufa:0.026, fatPufa:0.081, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.065, calc:6.59, zinc:0.305, b12:1.25, vitD:0, omega3:0, iod:114, sel:22.8, mag:18, pot:245, fol:0},
{id:"usda_2684445", name:"Fish, catfish, farm raised, raw", cat:"Fish & Seafood", cal:0, pro:16.5, carb:0, fat:7.31, fib:0, fibSol:0, fibInsol:0, fatSat:1.6, fatMufa:3.32, fatPufa:1.19, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0, calc:7.8, zinc:0.475, b12:2.27, vitD:0, omega3:0.062, iod:1.94, sel:9.28, mag:20.6, pot:292, fol:0},
{id:"usda_2684446", name:"Crustaceans, crab, blue swimming, lump, pasteurized, refrigerated", cat:"Fish & Seafood", cal:0, pro:18.6, carb:0, fat:0.808, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.632, calc:111, zinc:3.48, b12:3.12, vitD:0, omega3:0, iod:44.5, sel:45.8, mag:43.1, pot:235, fol:0},
{id:"usda_2685568", name:"Squash, summer, green, zucchini, includes skin, raw", cat:"Vegetables", cal:0, pro:0.984, carb:3.27, fat:0.205, fib:0.752, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.194, calc:20.8, zinc:0.26, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:15.3, pot:226, fol:71},
{id:"usda_2685569", name:"Squash, summer, yellow, includes skin, raw", cat:"Vegetables", cal:0, pro:0.891, carb:4.39, fat:0.135, fib:0.956, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.137, calc:22.7, zinc:0.203, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:16.8, pot:220, fol:36},
{id:"usda_2685570", name:"Squash, winter, butternut, raw", cat:"Vegetables", cal:0, pro:1.15, carb:10.5, fat:0.168, fib:1.96, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.213, calc:21.7, zinc:0.193, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:15, pot:329, fol:55},
{id:"usda_2685571", name:"Squash, winter, acorn, raw", cat:"Vegetables", cal:0, pro:1.25, carb:10.5, fat:0.182, fib:2.64, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.308, calc:24.8, zinc:0.294, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:23.8, pot:332, fol:50},
{id:"usda_2685572", name:"Cabbage, bok choy, raw", cat:"Vegetables", cal:0, pro:1.02, carb:3.51, fat:0.234, fib:1.26, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.439, calc:61.9, zinc:0.274, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:13.6, pot:228, fol:68},
{id:"usda_2685573", name:"Cauliflower, raw", cat:"Vegetables", cal:0, pro:1.64, carb:4.72, fat:0.238, fib:1.95, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.334, calc:20.4, zinc:0.234, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:14.2, pot:274, fol:97},
{id:"usda_2685574", name:"Collards, raw", cat:"Vegetables", cal:0, pro:2.97, carb:7.02, fat:0.77, fib:3.82, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.75, calc:276, zinc:0.459, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:49.5, pot:410, fol:168},
{id:"usda_2685575", name:"Brussels sprouts, raw", cat:"Vegetables", cal:0, pro:3.98, carb:9.62, fat:0.565, fib:4.78, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.73, calc:38.6, zinc:0.366, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:25, pot:477, fol:86},
{id:"usda_2685576", name:"Beets, raw", cat:"Vegetables", cal:0, pro:1.69, carb:8.79, fat:0.302, fib:3.12, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.428, calc:13.8, zinc:0.31, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:21, pot:342, fol:103},
{id:"usda_2685577", name:"Eggplant, raw", cat:"Vegetables", cal:0, pro:0.852, carb:5.4, fat:0.12, fib:2.45, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0, calc:11.1, zinc:0.119, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:13.5, pot:222, fol:20},
{id:"usda_2685578", name:"Tomatoes, whole, canned, solids and liquids, with salt added", cat:"Vegetables", cal:0, pro:0.868, carb:4.29, fat:0.206, fib:0.872, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.929, calc:19.8, zinc:0.12, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:10.8, pot:203, fol:0},
{id:"usda_2685579", name:"Tomato, sauce, canned, with salt added", cat:"Vegetables", cal:0, pro:1.35, carb:6.33, fat:0.382, fib:1.64, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:1.11, calc:17.1, zinc:0.183, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:18.7, pot:356, fol:0},
{id:"usda_2685580", name:"Tomato, paste, canned, without salt added", cat:"Vegetables", cal:0, pro:4.23, carb:20.2, fat:0.732, fib:4.7, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:3.18, calc:36.8, zinc:0.511, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:49.6, pot:972, fol:0},
{id:"usda_2685581", name:"Tomatoes, crushed, canned", cat:"Vegetables", cal:0, pro:1.44, carb:7.14, fat:0.398, fib:1.94, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:2.27, calc:19.2, zinc:0.201, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:18.6, pot:346, fol:0},
{id:"usda_2685582", name:"Tomato, puree, canned", cat:"Vegetables", cal:0, pro:1.58, carb:8.04, fat:0.265, fib:1.97, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:1.24, calc:17.6, zinc:0.208, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:19.3, pot:416, fol:0},
{id:"usda_2710815", name:"Apricot, with skin, raw", cat:"Fruit", cal:0, pro:0.961, carb:10.2, fat:0.405, fib:1.51, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.163, calc:11.6, zinc:0.148, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:8.88, pot:231, fol:0},
{id:"usda_2710816", name:"Melons, honeydew, raw", cat:"Fruit", cal:0, pro:0.531, carb:8.15, fat:0.216, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0, calc:6.58, zinc:0.06, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:9.5, pot:209, fol:0},
{id:"usda_2710817", name:"Plantains, ripe, raw", cat:"Fruit", cal:0, pro:1.16, carb:31, fat:0.893, fib:2.12, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.319, calc:3.82, zinc:0.147, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:33.9, pot:396, fol:0},
{id:"usda_2710818", name:"Plantains, underripe, raw", cat:"Fruit", cal:0, pro:1.23, carb:33.6, fat:0.685, fib:2.53, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.334, calc:4.83, zinc:0.185, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:29.5, pot:406, fol:0},
{id:"usda_2710819", name:"Chia seeds, dry, raw", cat:"Grains", cal:0, pro:17, carb:38.3, fat:32.9, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:6.04, calc:595, zinc:5.56, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:326, pot:642, fol:0},
{id:"usda_2710820", name:"Bulgur, dry, raw", cat:"Grains", cal:0, pro:11.8, carb:75.9, fat:2.42, fib:11.7, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:2.62, calc:34.1, zinc:2.15, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:119, pot:358, fol:0},
{id:"usda_2710821", name:"Wild rice, dry, raw", cat:"Grains", cal:0, pro:12.8, carb:75.7, fat:1.7, fib:4.26, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:1.53, calc:7.97, zinc:5.84, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:108, pot:299, fol:0},
{id:"usda_2710822", name:"Arugula, baby, raw", cat:"Vegetables", cal:0, pro:1.65, carb:5.37, fat:0.325, fib:2.28, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:1.39, calc:204, zinc:0.348, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:42.6, pot:407, fol:149},
{id:"usda_2710823", name:"Asparagus, green, raw", cat:"Vegetables", cal:0, pro:1.44, carb:5.1, fat:0.216, fib:1.88, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.444, calc:20.6, zinc:0.596, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:13.8, pot:278, fol:182},
{id:"usda_2710824", name:"Avocado, Hass, peeled, raw", cat:"Fruit", cal:0, pro:1.81, carb:8.32, fat:20.3, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.613, calc:14.5, zinc:0.46, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:32.8, pot:576, fol:129},
{id:"usda_2710825", name:"Rice, black, unenriched, raw", cat:"Grains", cal:0, pro:7.57, carb:77.2, fat:3.44, fib:4.18, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:1.12, calc:14.4, zinc:1.72, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:113, pot:256, fol:0},
{id:"usda_2710826", name:"Corn, sweet, yellow and white kernels, \u00a0fresh, raw", cat:"Vegetables", cal:0, pro:2.79, carb:14.7, fat:1.63, fib:2.43, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.388, calc:0.656, zinc:0.556, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:25.8, pot:237, fol:0},
{id:"usda_2710827", name:"Einkorn, grain, dry, raw", cat:"Grains", cal:0, pro:15.1, carb:68.7, fat:3.81, fib:8.91, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:3.69, calc:41.4, zinc:5.23, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:140, pot:432, fol:0},
{id:"usda_2710828", name:"Farro, pearled, dry, raw", cat:"Grains", cal:0, pro:12.6, carb:72.1, fat:3.1, fib:7.31, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:3.2, calc:25.9, zinc:3.97, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:119, pot:385, fol:0},
{id:"usda_2710829", name:"Fonio, grain, dry, raw", cat:"Grains", cal:0, pro:7.17, carb:81.3, fat:1.69, fib:2.2, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:2.66, calc:11.6, zinc:1.85, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:39.1, pot:43.8, fol:0},
{id:"usda_2710830", name:"Khorasan, grain, dry, raw", cat:"Grains", cal:0, pro:14.8, carb:71.8, fat:2.8, fib:10.5, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:3.87, calc:24.1, zinc:4.46, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:130, pot:450, fol:0},
{id:"usda_2710831", name:"Kiwifruit (kiwi), green, peeled, raw", cat:"Fruit", cal:0, pro:1.01, carb:13.8, fat:0.64, fib:2.13, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.037, calc:24.4, zinc:0.455, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:14.8, pot:302, fol:32.8},
{id:"usda_2710832", name:"Mandarin, seedless, peeled, raw", cat:"Fruit", cal:0, pro:1.04, carb:13.4, fat:0.458, fib:1.33, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0, calc:44, zinc:0.069, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:12.6, pot:167, fol:0},
{id:"usda_2710833", name:"Mango, Tommy Atkins, peeled, raw", cat:"Fruit", cal:0, pro:0.562, carb:15.3, fat:0.572, fib:1.75, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0, calc:12.4, zinc:0.066, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:10.3, pot:165, fol:0},
{id:"usda_2710834", name:"Mango, Ataulfo, peeled, raw", cat:"Fruit", cal:0, pro:0.688, carb:17.4, fat:0.681, fib:1.29, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0, calc:10, zinc:0.102, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:10.6, pot:204, fol:0},
{id:"usda_2710835", name:"Corn flour, masa harina, white or yellow, dry, raw", cat:"Grains", cal:0, pro:7.56, carb:76.7, fat:4.34, fib:7.04, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:1.7, calc:112, zinc:1.62, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:93.3, pot:277, fol:0},
{id:"usda_2710836", name:"Pear, Anjou, green, with skin, raw", cat:"Fruit", cal:0, pro:0.312, carb:14.8, fat:0.371, fib:2.64, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0, calc:9.99, zinc:0.107, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:6.49, pot:122, fol:0},
{id:"usda_2710837", name:"Plum, black, with skin, raw", cat:"Fruit", cal:0, pro:0.578, carb:13.5, fat:0.282, fib:1.35, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0, calc:4.03, zinc:0.045, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:6.62, pot:186, fol:0},
{id:"usda_2710838", name:"Rice, red, unenriched, dry, raw", cat:"Grains", cal:0, pro:8.56, carb:76.2, fat:3.44, fib:4.2, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:1.2, calc:9.22, zinc:2.56, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:126, pot:245, fol:0},
{id:"usda_2710839", name:"Sorghum bran, white, unenriched, dry, raw", cat:"Grains", cal:0, pro:11.2, carb:68.7, fat:9.26, fib:35, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:14.2, calc:61.7, zinc:4.4, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:274, pot:852, fol:0},
{id:"usda_2710840", name:"Sorghum flour, white, pearled, unenriched, dry, raw", cat:"Grains", cal:0, pro:10.2, carb:73.5, fat:3.24, fib:3.3, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:2.22, calc:7.89, zinc:1.32, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:107, pot:274, fol:0},
{id:"usda_2710841", name:"Sorghum grain, white, pearled, unenriched, dry, raw", cat:"Grains", cal:0, pro:10.2, carb:74.9, fat:3.26, fib:3.92, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:2.04, calc:7.45, zinc:1.28, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:109, pot:274, fol:0},
{id:"usda_2710842", name:"Sorghum, whole grain, white, dry, raw", cat:"Grains", cal:0, pro:10.1, carb:73.6, fat:4.22, fib:8.27, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:3.9, calc:14.9, zinc:1.77, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:136, pot:367, fol:0},
{id:"usda_2710843", name:"Plantains, overripe, raw", cat:"Fruit", cal:0, pro:1.17, carb:29.2, fat:0.99, fib:1.79, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.315, calc:3.9, zinc:0.149, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:31.7, pot:408, fol:0},
{id:"usda_2727566", name:"Chicken, drumstick, meat and skin, raw", cat:"Meat", cal:0, pro:18.4, carb:-0.475, fat:5.94, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.666, calc:8.28, zinc:1.7, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:18.6, pot:244, fol:0},
{id:"usda_2727567", name:"Chicken, thigh, meat and skin, raw", cat:"Meat", cal:0, pro:17.1, carb:-0.173, fat:13.4, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.586, calc:5.73, zinc:1.2, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:18.5, pot:246, fol:0},
{id:"usda_2727568", name:"Chicken, wing, meat and skin, raw", cat:"Meat", cal:0, pro:18.4, carb:-0.459, fat:10.6, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.511, calc:13.6, zinc:1.18, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:16.5, pot:194, fol:0},
{id:"usda_2727569", name:"Chicken, breast, meat and skin, raw", cat:"Meat", cal:0, pro:21.4, carb:-0.428, fat:4.78, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.354, calc:6.9, zinc:0.624, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:25.4, pot:332, fol:0},
{id:"usda_2727570", name:"Lamb, ground, raw", cat:"Meat", cal:0, pro:17.5, carb:-0.251, fat:18.6, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:1.64, calc:6.58, zinc:3.13, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:17.5, pot:272, fol:0},
{id:"usda_2727571", name:"Bison, ground, raw", cat:"Meat", cal:0, pro:19.9, carb:-0.15, fat:8.88, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:2.17, calc:6.83, zinc:3.76, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:18.5, pot:301, fol:0},
{id:"usda_2727572", name:"Beef, short loin (NY strip steak), raw", cat:"Meat", cal:0, pro:21.3, carb:0.221, fat:11.5, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:1.61, calc:5.04, zinc:3.28, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:19.5, pot:323, fol:0},
{id:"usda_2727573", name:"Beef,\u00a0tenderloin steak, raw", cat:"Meat", cal:0, pro:21.1, carb:0.18, fat:6.46, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:2.53, calc:4.09, zinc:3.22, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:22, pot:345, fol:0},
{id:"usda_2727574", name:"Beef, top sirloin steak, raw", cat:"Meat", cal:0, pro:22, carb:0.218, fat:5.71, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:2.22, calc:3.7, zinc:3.45, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:22.1, pot:349, fol:0},
{id:"usda_2727575", name:"Pork, chop, center cut, raw", cat:"Meat", cal:0, pro:22.8, carb:-0.562, fat:5.48, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.421, calc:4.12, zinc:1.32, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:23.4, pot:366, fol:0},
{id:"usda_2727576", name:"Pork, belly, with skin, raw", cat:"Meat", cal:0, pro:15.2, carb:-0.705, fat:35.8, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.382, calc:4.2, zinc:1.07, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:12.2, pot:208, fol:0},
{id:"usda_2727577", name:"Pawpaw, peeled, seeded, raw", cat:"Fruit", cal:0, pro:1.15, carb:0, fat:0, fib:3.3, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.075, calc:9.91, zinc:0.085, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:10.6, pot:221, fol:116},
{id:"usda_2727578", name:"Squash, pie pumpkin, peeled, seeded, raw", cat:"Vegetables", cal:0, pro:0.854, carb:0, fat:0, fib:2.3, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.063, calc:16.4, zinc:0.139, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:12.8, pot:472, fol:31},
{id:"usda_2727579", name:"Squash, spaghetti, peeled, seeded, raw", cat:"Vegetables", cal:0, pro:0.792, carb:0, fat:0, fib:1.4, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.031, calc:16.6, zinc:0.105, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:13.3, pot:267, fol:12.7},
{id:"usda_2727580", name:"Rutabaga, peeled, raw", cat:"Vegetables", cal:0, pro:0.888, carb:0, fat:0, fib:2.9, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.137, calc:42, zinc:0.211, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:15.4, pot:267, fol:0},
{id:"usda_2727581", name:"Blackberries, raw", cat:"Fruit", cal:0, pro:1.53, carb:0, fat:0, fib:5.3, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.208, calc:15.4, zinc:0.189, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:20.6, pot:167, fol:0},
{id:"usda_2727582", name:"Tomatillos, dehusked, raw", cat:"Vegetables", cal:0, pro:1.06, carb:0, fat:0, fib:1.7, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.245, calc:7.14, zinc:0.159, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:13.5, pot:239, fol:16.4},
{id:"usda_2727583", name:"Cabbage, napa, leaf, destemmed, raw", cat:"Vegetables", cal:0, pro:1.06, carb:0, fat:0, fib:1.2, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.255, calc:35, zinc:0.253, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:11.3, pot:235, fol:0},
{id:"usda_2727584", name:"Leeks, bulb and greens, root removed, raw", cat:"Vegetables", cal:0, pro:1.47, carb:0, fat:0, fib:3, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.761, calc:51.4, zinc:0.293, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:15.7, pot:319, fol:0},
{id:"usda_2727585", name:"Green onion, (scallion), bulb and greens, root removed, raw", cat:"Vegetables", cal:0, pro:0.669, carb:0, fat:0, fib:2.3, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:1.04, calc:59.4, zinc:0.248, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:18.9, pot:232, fol:0},
{id:"usda_2727586", name:"Shallots, bulb, peeled, root removed, raw", cat:"Vegetables", cal:0, pro:1.38, carb:0, fat:0, fib:2.2, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.332, calc:26.1, zinc:0.282, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:15.1, pot:252, fol:0},
{id:"usda_2727587", name:"Juice, prune, shelf-stable", cat:"Fruit", cal:0, pro:0.423, carb:0, fat:0, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.444, calc:16.2, zinc:0.122, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:15.2, pot:216, fol:5.29},
{id:"usda_2727588", name:"Juice, pomegranate, from concentrate, shelf-stable", cat:"Fruit", cal:0, pro:0, carb:0, fat:0, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.031, calc:11, zinc:0.082, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:6.86, pot:166, fol:5.87},
{id:"usda_2727589", name:"Juice, tart cherry, from concentrate, shelf-stable", cat:"Fruit", cal:0, pro:0.147, carb:0, fat:0, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.203, calc:16.2, zinc:0.033, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:12.1, pot:170, fol:4.67},
{id:"usda_2747652", name:"Anchovies, canned in olive oil, with salt, drained", cat:"Fish & Seafood", cal:0, pro:26.9, carb:2.41, fat:9.85, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:2.69, calc:240, zinc:2.54, b12:12.6, vitD:0, omega3:0, iod:0, sel:48.2, mag:228, pot:298, fol:0},
{id:"usda_2747653", name:"Beet greens, raw", cat:"Vegetables", cal:0, pro:1.61, carb:4.66, fat:0.144, fib:2.58, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:3.16, calc:72.8, zinc:0.315, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:74.4, pot:369, fol:152},
{id:"usda_2747654", name:"Cod, Pacific or Alaskan, frozen, wild caught", cat:"Fish & Seafood", cal:0, pro:14.2, carb:0.524, fat:0.216, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0, calc:9.01, zinc:0.269, b12:0.586, vitD:0, omega3:0, iod:0, sel:22.3, mag:17.9, pot:192, fol:0},
{id:"usda_2747655", name:"Fennel, bulb, raw", cat:"Vegetables", cal:0, pro:0.922, carb:5.49, fat:0.14, fib:2.05, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0, calc:41.3, zinc:0.141, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:15, pot:332, fol:37},
{id:"usda_2747656", name:"Halibut, frozen, wild caught", cat:"Fish & Seafood", cal:0, pro:19.1, carb:-0.06, fat:0.592, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0, calc:4.1, zinc:0.327, b12:0.582, vitD:0, omega3:0, iod:0, sel:53.7, mag:23.1, pot:430, fol:0},
{id:"usda_2747657", name:"Lobster, tail only, frozen, wild caught", cat:"Fish & Seafood", cal:0, pro:13, carb:0.886, fat:0.367, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.173, calc:71.6, zinc:1.54, b12:0.995, vitD:0, omega3:0, iod:0, sel:63.1, mag:39, pot:213, fol:0},
{id:"usda_2747658", name:"Mahi mahi, frozen, wild caught", cat:"Fish & Seafood", cal:0, pro:19.8, carb:0.287, fat:0.377, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.052, calc:6, zinc:0.296, b12:1.34, vitD:0, omega3:0, iod:0, sel:50.2, mag:28, pot:408, fol:0},
{id:"usda_2747659", name:"Parsnips, raw", cat:"Vegetables", cal:0, pro:1.27, carb:19.3, fat:0.538, fib:5.35, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.505, calc:44.2, zinc:0.328, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:22, pot:493, fol:83.4},
{id:"usda_2747660", name:"Peppers, banana or Hungarian wax, seeded, raw", cat:"Vegetables", cal:0, pro:0.723, carb:4.97, fat:0.131, fib:1.79, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.162, calc:9.82, zinc:0.13, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:10.2, pot:177, fol:31.8},
{id:"usda_2747661", name:"Peppers, jalapeno, seeded, raw", cat:"Vegetables", cal:0, pro:0.621, carb:5.08, fat:0.149, fib:1.72, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.038, calc:10.1, zinc:0.094, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:8.95, pot:167, fol:27.4},
{id:"usda_2747662", name:"Peppers, poblano, seeded, raw", cat:"Vegetables", cal:0, pro:1.43, carb:5.14, fat:0.191, fib:2.07, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.117, calc:8.37, zinc:0.128, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:10.7, pot:192, fol:26},
{id:"usda_2747663", name:"Peppers, serrano, seeded, raw", cat:"Vegetables", cal:0, pro:0.856, carb:6.14, fat:0.141, fib:2.52, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.057, calc:12.9, zinc:0.138, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:12.7, pot:224, fol:28.2},
{id:"usda_2747664", name:"Radicchio, raw", cat:"Vegetables", cal:0, pro:1.31, carb:4.96, fat:0.143, fib:2.11, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.401, calc:30.9, zinc:0.2, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:13, pot:335, fol:117},
{id:"usda_2747665", name:"Radishes, red, raw", cat:"Vegetables", cal:0, pro:0.656, carb:4.06, fat:0.083, fib:1.31, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0, calc:21.5, zinc:0.104, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:8.94, pot:198, fol:63.2},
{id:"usda_2747666", name:"Scallops, bay, Patagonian, frozen, wild caught", cat:"Fish & Seafood", cal:0, pro:16.4, carb:2.28, fat:0.419, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.172, calc:14, zinc:1.02, b12:0.67, vitD:0, omega3:0, iod:0, sel:28.4, mag:46.4, pot:292, fol:0},
{id:"usda_2747667", name:"Scallops, sea, frozen, wild caught", cat:"Fish & Seafood", cal:0, pro:13.5, carb:1.97, fat:0.493, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.213, calc:10.5, zinc:1, b12:1.28, vitD:0, omega3:0, iod:0, sel:15.7, mag:30.6, pot:245, fol:0},
{id:"usda_2747668", name:"Sea bass, Chilean, frozen, wild caught", cat:"Fish & Seafood", cal:0, pro:14.9, carb:0.139, fat:16.6, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0, calc:6.82, zinc:0.295, b12:0.588, vitD:0, omega3:0, iod:0, sel:69.4, mag:16.6, pot:236, fol:0},
{id:"usda_2747669", name:"Snapper, frozen, wild caught", cat:"Fish & Seafood", cal:0, pro:20.7, carb:0.441, fat:0.569, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.201, calc:13.9, zinc:0.364, b12:1.57, vitD:0, omega3:0, iod:0, sel:71.4, mag:27.5, pot:349, fol:0},
{id:"usda_2747670", name:"Snow crab, legs only, frozen  ", cat:"Fish & Seafood", cal:0, pro:15.5, carb:1.11, fat:0.294, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.276, calc:97.8, zinc:3.37, b12:2.22, vitD:0, omega3:0, iod:0, sel:60, mag:58.4, pot:193, fol:0},
{id:"usda_2747671", name:"Squid (calamari), frozen, tubes only", cat:"Fish & Seafood", cal:0, pro:8.81, carb:0.932, fat:0.551, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0, calc:10.6, zinc:0.527, b12:1.12, vitD:0, omega3:0, iod:0, sel:20.9, mag:10.5, pot:9.48, fol:0},
{id:"usda_2747672", name:"Swordfish, frozen, wild caught", cat:"Fish & Seafood", cal:0, pro:19.2, carb:0.45, fat:8.12, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.096, calc:3.62, zinc:0.541, b12:0.87, vitD:0, omega3:0, iod:0, sel:60.7, mag:26.7, pot:414, fol:0},
{id:"usda_2747673", name:"Tuna, ahi or yellowfin, frozen, wild caught", cat:"Fish & Seafood", cal:0, pro:24.7, carb:-0.104, fat:0.388, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.591, calc:3.19, zinc:0.352, b12:1.37, vitD:0, omega3:0, iod:0, sel:76.5, mag:35.5, pot:420, fol:0},
{id:"usda_2747674", name:"Turnips, raw", cat:"Vegetables", cal:0, pro:0.953, carb:7.27, fat:0.119, fib:1.92, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0, calc:32.7, zinc:0.156, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:10.4, pot:262, fol:60.2},
{id:"usda_2747675", name:"Watermelon, seedless, flesh only, raw", cat:"Fruit", cal:0, pro:0.871, carb:0, fat:0, fib:0, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.021, calc:7.86, zinc:0.102, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:11.4, pot:117, fol:11.9},
{id:"usda_2747676", name:"Watermelon, seedless, rind only, raw", cat:"Fruit", cal:0, pro:0.531, carb:4.17, fat:0.07, fib:1.54, fibSol:0, fibInsol:0, fatSat:0, fatMufa:0, fatPufa:0, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0, calc:16.9, zinc:0.121, b12:0, vitD:0, omega3:0, iod:0, sel:0, mag:9.67, pot:272, fol:29.7}
];
// ── END SPIKE 5.9 DB ─────────────────────────────────────────────────────────


const FOOD_DB = [
{ id:"oats",           name:"Oats (rolled)",           cat:"Grains",       cal:389, pro:16.9, carb:66.3, fat:6.9,  fib:10.6, fibSol:5.8,  fibInsol:4.8,  fatSat:1.2,  fatMufa:2.2,  fatPufa:2.5,  aaHis:0.43, aaIle:0.54, aaLeu:1.28, aaLys:0.70, aaMet:0.31, aaPhe:0.90, aaThr:0.57, aaTrp:0.19, aaVal:0.94, iron:4.7,  calc:54,  zinc:4.0, b12:0,    vitD:0,   omega3:0.11, iod:0,  sel:28.9, mag:177, pot:429,  fol:56  },
{ id:"rice_brown",     name:"Brown Rice (cooked)",      cat:"Grains",       cal:123, pro:2.7,  carb:25.6, fat:0.9,  fib:1.6,  fibSol:0.2,  fibInsol:1.4,  fatSat:0.2,  fatMufa:0.3,  fatPufa:0.3,  aaHis:0.08, aaIle:0.11, aaLeu:0.22, aaLys:0.10, aaMet:0.07, aaPhe:0.14, aaThr:0.10, aaTrp:0.03, aaVal:0.17, iron:0.4,  calc:10,  zinc:0.6, b12:0,    vitD:0,   omega3:0.02, iod:0,  sel:9.8,  mag:44,  pot:79,   fol:9   },
{ id:"rice_white",     name:"White Rice (cooked)",      cat:"Grains",       cal:130, pro:2.7,  carb:28.6, fat:0.3,  fib:0.4,  fibSol:0.1,  fibInsol:0.3,  fatSat:0.1,  fatMufa:0.1,  fatPufa:0.1,  aaHis:0.07, aaIle:0.11, aaLeu:0.22, aaLys:0.09, aaMet:0.06, aaPhe:0.14, aaThr:0.10, aaTrp:0.03, aaVal:0.17, iron:0.2,  calc:10,  zinc:0.5, b12:0,    vitD:0,   omega3:0.01, iod:0,  sel:7.5,  mag:13,  pot:35,   fol:2   },
{ id:"quinoa",         name:"Quinoa (cooked)",          cat:"Grains",       cal:120, pro:4.4,  carb:21.3, fat:1.9,  fib:2.8,  fibSol:0.9,  fibInsol:1.9,  fatSat:0.2,  fatMufa:0.5,  fatPufa:1.1,  aaHis:0.18, aaIle:0.20, aaLeu:0.31, aaLys:0.30, aaMet:0.12, aaPhe:0.24, aaThr:0.18, aaTrp:0.05, aaVal:0.23, iron:1.5,  calc:17,  zinc:1.1, b12:0,    vitD:0,   omega3:0.09, iod:0,  sel:2.8,  mag:64,  pot:172,  fol:42  },
{ id:"bread_whole",    name:"Whole Wheat Bread",        cat:"Grains",       cal:247, pro:13.0, carb:41.3, fat:3.4,  fib:7.0,  fibSol:1.4,  fibInsol:5.6,  fatSat:0.7,  fatMufa:0.6,  fatPufa:1.5,  aaHis:0.29, aaIle:0.41, aaLeu:0.87, aaLys:0.31, aaMet:0.19, aaPhe:0.59, aaThr:0.33, aaTrp:0.13, aaVal:0.52, iron:3.6,  calc:107, zinc:1.8, b12:0,    vitD:0,   omega3:0.14, iod:14, sel:30.5, mag:76,  pot:248,  fol:44  },
{ id:"pasta",          name:"Pasta (cooked)",           cat:"Grains",       cal:131, pro:5.0,  carb:25.4, fat:1.1,  fib:1.8,  fibSol:0.4,  fibInsol:1.4,  fatSat:0.2,  fatMufa:0.1,  fatPufa:0.4,  aaHis:0.13, aaIle:0.20, aaLeu:0.42, aaLys:0.16, aaMet:0.09, aaPhe:0.29, aaThr:0.17, aaTrp:0.07, aaVal:0.25, iron:0.5,  calc:7,   zinc:0.5, b12:0,    vitD:0,   omega3:0.04, iod:0,  sel:26.4, mag:18,  pot:44,   fol:7   },
{ id:"tortilla_corn",  name:"Corn Tortilla",            cat:"Grains",       cal:218, pro:5.7,  carb:44.6, fat:2.8,  fib:6.7,  fibSol:1.3,  fibInsol:5.4,  fatSat:0.4,  fatMufa:0.7,  fatPufa:1.3,  aaHis:0.14, aaIle:0.18, aaLeu:0.57, aaLys:0.15, aaMet:0.09, aaPhe:0.25, aaThr:0.17, aaTrp:0.03, aaVal:0.25, iron:1.6,  calc:81,  zinc:0.7, b12:0,    vitD:0,   omega3:0.05, iod:0,  sel:10.3, mag:51,  pot:157,  fol:27  },
{ id:"flour_wheat",    name:"Wheat Flour (white)",      cat:"Grains",       cal:364, pro:10.3, carb:76.3, fat:1.0,  fib:2.7,  fibSol:0.5,  fibInsol:2.2,  fatSat:0.2,  fatMufa:0.1,  fatPufa:0.4,  aaHis:0.22, aaIle:0.40, aaLeu:0.80, aaLys:0.22, aaMet:0.17, aaPhe:0.54, aaThr:0.28, aaTrp:0.11, aaVal:0.44, iron:1.2,  calc:15,  zinc:0.7, b12:0,    vitD:0,   omega3:0.05, iod:0,  sel:33.9, mag:22,  pot:107,  fol:20  },
{ id:"pasta_dry",      name:"Pasta (dry)",              cat:"Grains",       cal:371, pro:13.0, carb:74.7, fat:1.5,  fib:3.2,  fibSol:0.6,  fibInsol:2.6,  fatSat:0.3,  fatMufa:0.2,  fatPufa:0.6,  aaHis:0.35, aaIle:0.52, aaLeu:1.10, aaLys:0.38, aaMet:0.23, aaPhe:0.75, aaThr:0.43, aaTrp:0.17, aaVal:0.64, iron:1.3,  calc:21,  zinc:1.4, b12:0,    vitD:0,   omega3:0.09, iod:0,  sel:63.2, mag:53,  pot:223,  fol:7   },
{ id:"rice_brown_dry", name:"Brown Rice (dry)",         cat:"Grains",       cal:370, pro:7.9,  carb:77.2, fat:2.9,  fib:3.5,  fibSol:0.4,  fibInsol:3.1,  fatSat:0.6,  fatMufa:1.1,  fatPufa:1.0,  aaHis:0.23, aaIle:0.33, aaLeu:0.67, aaLys:0.30, aaMet:0.21, aaPhe:0.43, aaThr:0.31, aaTrp:0.10, aaVal:0.50, iron:1.5,  calc:23,  zinc:2.0, b12:0,    vitD:0,   omega3:0.06, iod:0,  sel:23.4, mag:143, pot:268,  fol:20  },
{ id:"rice_white_dry", name:"White Rice (dry)",         cat:"Grains",       cal:365, pro:6.6,  carb:80.0, fat:0.7,  fib:1.3,  fibSol:0.2,  fibInsol:1.1,  fatSat:0.2,  fatMufa:0.2,  fatPufa:0.2,  aaHis:0.18, aaIle:0.32, aaLeu:0.63, aaLys:0.25, aaMet:0.19, aaPhe:0.39, aaThr:0.27, aaTrp:0.09, aaVal:0.49, iron:0.8,  calc:28,  zinc:1.2, b12:0,    vitD:0,   omega3:0.03, iod:0,  sel:15.1, mag:35,  pot:115,  fol:8   },
{ id:"quinoa_dry",     name:"Quinoa (dry)",             cat:"Grains",       cal:368, pro:14.1, carb:64.2, fat:6.1,  fib:7.0,  fibSol:2.3,  fibInsol:4.7,  fatSat:0.7,  fatMufa:1.6,  fatPufa:3.3,  aaHis:0.41, aaIle:0.50, aaLeu:0.84, aaLys:0.77, aaMet:0.31, aaPhe:0.59, aaThr:0.42, aaTrp:0.17, aaVal:0.65, iron:4.6,  calc:47,  zinc:3.1, b12:0,    vitD:0,   omega3:0.26, iod:0,  sel:8.5,  mag:197, pot:563,  fol:184 },
{ id:"lentils",        name:"Lentils (cooked)",         cat:"Legumes",      cal:116, pro:9.0,  carb:20.1, fat:0.4,  fib:7.9,  fibSol:2.6,  fibInsol:5.3,  fatSat:0.1,  fatMufa:0.1,  fatPufa:0.2,  aaHis:0.27, aaIle:0.37, aaLeu:0.65, aaLys:0.63, aaMet:0.08, aaPhe:0.44, aaThr:0.33, aaTrp:0.08, aaVal:0.42, iron:3.3,  calc:19,  zinc:1.3, b12:0,    vitD:0,   omega3:0.09, iod:0,  sel:2.8,  mag:36,  pot:369,  fol:181 },
{ id:"chickpeas",      name:"Chickpeas (cooked)",       cat:"Legumes",      cal:164, pro:8.9,  carb:27.4, fat:2.6,  fib:7.6,  fibSol:2.5,  fibInsol:5.1,  fatSat:0.3,  fatMufa:0.6,  fatPufa:1.2,  aaHis:0.25, aaIle:0.36, aaLeu:0.62, aaLys:0.52, aaMet:0.10, aaPhe:0.43, aaThr:0.30, aaTrp:0.09, aaVal:0.39, iron:2.9,  calc:49,  zinc:1.5, b12:0,    vitD:0,   omega3:0.04, iod:0,  sel:3.7,  mag:48,  pot:291,  fol:172 },
{ id:"black_beans",    name:"Black Beans (cooked)",     cat:"Legumes",      cal:132, pro:8.9,  carb:23.7, fat:0.5,  fib:8.7,  fibSol:2.9,  fibInsol:5.8,  fatSat:0.1,  fatMufa:0.1,  fatPufa:0.2,  aaHis:0.26, aaIle:0.38, aaLeu:0.67, aaLys:0.59, aaMet:0.11, aaPhe:0.46, aaThr:0.34, aaTrp:0.10, aaVal:0.44, iron:2.1,  calc:27,  zinc:1.0, b12:0,    vitD:0,   omega3:0.18, iod:0,  sel:1.2,  mag:70,  pot:355,  fol:149 },
{ id:"kidney_beans",   name:"Kidney Beans (cooked)",    cat:"Legumes",      cal:127, pro:8.7,  carb:22.8, fat:0.5,  fib:7.4,  fibSol:2.5,  fibInsol:4.9,  fatSat:0.1,  fatMufa:0.0,  fatPufa:0.2,  aaHis:0.25, aaIle:0.37, aaLeu:0.66, aaLys:0.57, aaMet:0.10, aaPhe:0.44, aaThr:0.33, aaTrp:0.09, aaVal:0.43, iron:2.2,  calc:50,  zinc:1.0, b12:0,    vitD:0,   omega3:0.19, iod:0,  sel:1.4,  mag:45,  pot:403,  fol:130 },
{ id:"tofu_firm",      name:"Tofu (firm)",              cat:"Legumes",      cal:144, pro:17.3, carb:3.5,  fat:8.7,  fib:0.3,  fibSol:0.1,  fibInsol:0.2,  fatSat:1.3,  fatMufa:1.9,  fatPufa:4.9,  aaHis:0.44, aaIle:0.76, aaLeu:1.32, aaLys:1.04, aaMet:0.22, aaPhe:0.81, aaThr:0.67, aaTrp:0.21, aaVal:0.82, iron:2.7,  calc:350, zinc:1.6, b12:0,    vitD:0,   omega3:0.58, iod:0,  sel:9.9,  mag:58,  pot:121,  fol:29  },
{ id:"tempeh",         name:"Tempeh",                   cat:"Legumes",      cal:192, pro:20.3, carb:7.6,  fat:10.8, fib:0,    fibSol:0,    fibInsol:0,    fatSat:2.2,  fatMufa:2.4,  fatPufa:5.6,  aaHis:0.51, aaIle:0.89, aaLeu:1.49, aaLys:1.14, aaMet:0.27, aaPhe:0.98, aaThr:0.77, aaTrp:0.28, aaVal:0.99, iron:2.7,  calc:111, zinc:1.7, b12:0,    vitD:0,   omega3:0.23, iod:0,  sel:0.1,  mag:81,  pot:412,  fol:0   },
{ id:"peanuts",        name:"Peanuts (raw)",            cat:"Legumes",      cal:567, pro:25.8, carb:16.1, fat:49.2, fib:8.5,  fibSol:2.1,  fibInsol:6.4,  fatSat:6.8,  fatMufa:24.4, fatPufa:15.6, aaHis:0.72, aaIle:0.93, aaLeu:1.67, aaLys:0.93, aaMet:0.28, aaPhe:1.31, aaThr:0.72, aaTrp:0.25, aaVal:1.11, iron:4.6,  calc:92,  zinc:3.3, b12:0,    vitD:0,   omega3:0.003,iod:0,  sel:7.2,  mag:168, pot:705,  fol:240 },
{ id:"peanut_butter",  name:"Peanut Butter",            cat:"Legumes",      cal:588, pro:25.1, carb:20.1, fat:49.9, fib:6.0,  fibSol:1.5,  fibInsol:4.5,  fatSat:10.3, fatMufa:23.7, fatPufa:13.5, aaHis:0.65, aaIle:0.83, aaLeu:1.52, aaLys:0.74, aaMet:0.26, aaPhe:1.19, aaThr:0.66, aaTrp:0.24, aaVal:1.01, iron:1.9,  calc:43,  zinc:2.9, b12:0,    vitD:0,   omega3:0.003,iod:0,  sel:5.1,  mag:154, pot:564,  fol:86  },
{ id:"hummus",         name:"Hummus",                   cat:"Legumes",      cal:166, pro:7.9,  carb:14.3, fat:9.6,  fib:6.0,  fibSol:2.0,  fibInsol:4.0,  fatSat:1.4,  fatMufa:5.1,  fatPufa:2.4,  aaHis:0.22, aaIle:0.31, aaLeu:0.54, aaLys:0.46, aaMet:0.09, aaPhe:0.38, aaThr:0.26, aaTrp:0.08, aaVal:0.34, iron:2.4,  calc:38,  zinc:1.1, b12:0,    vitD:0,   omega3:0.3,  iod:0,  sel:2.6,  mag:53,  pot:228,  fol:72  },
{ id:"lentils_dry",    name:"Lentils (dry)",            cat:"Legumes",      cal:353, pro:25.8, carb:60.1, fat:1.1,  fib:30.5, fibSol:10.0, fibInsol:20.5, fatSat:0.2,  fatMufa:0.2,  fatPufa:0.5,  aaHis:0.77, aaIle:1.07, aaLeu:1.87, aaLys:1.81, aaMet:0.22, aaPhe:1.27, aaThr:0.95, aaTrp:0.22, aaVal:1.21, iron:7.5,  calc:35,  zinc:3.3, b12:0,    vitD:0,   omega3:0.09, iod:0,  sel:8.3,  mag:122, pot:955,  fol:479 },
{ id:"chickpeas_dry",  name:"Chickpeas (dry)",          cat:"Legumes",      cal:364, pro:19.3, carb:60.6, fat:6.0,  fib:17.4, fibSol:5.8,  fibInsol:11.6, fatSat:0.6,  fatMufa:1.4,  fatPufa:2.7,  aaHis:0.55, aaIle:0.83, aaLeu:1.43, aaLys:1.29, aaMet:0.25, aaPhe:1.03, aaThr:0.72, aaTrp:0.19, aaVal:0.88, iron:6.2,  calc:105, zinc:3.4, b12:0,    vitD:0,   omega3:0.1,  iod:0,  sel:8.2,  mag:115, pot:875,  fol:557 },
{ id:"black_beans_dry",name:"Black Beans (dry)",        cat:"Legumes",      cal:341, pro:21.6, carb:62.4, fat:1.4,  fib:15.5, fibSol:5.1,  fibInsol:10.4, fatSat:0.4,  fatMufa:0.1,  fatPufa:0.6,  aaHis:0.68, aaIle:1.00, aaLeu:1.79, aaLys:1.58, aaMet:0.28, aaPhe:1.23, aaThr:0.91, aaTrp:0.24, aaVal:1.16, iron:5.0,  calc:123, zinc:3.7, b12:0,    vitD:0,   omega3:0.18, iod:0,  sel:3.7,  mag:171, pot:1483, fol:444 },
{ id:"kidney_beans_dry",name:"Kidney Beans (dry)",      cat:"Legumes",      cal:337, pro:22.5, carb:61.3, fat:0.8,  fib:15.2, fibSol:5.0,  fibInsol:10.2, fatSat:0.1,  fatMufa:0.1,  fatPufa:0.4,  aaHis:0.66, aaIle:0.98, aaLeu:1.73, aaLys:1.52, aaMet:0.25, aaPhe:1.17, aaThr:0.86, aaTrp:0.23, aaVal:1.12, iron:8.2,  calc:83,  zinc:2.8, b12:0,    vitD:0,   omega3:0.34, iod:0,  sel:3.2,  mag:140, pot:1359, fol:394 },
{ id:"almonds",        name:"Almonds",                  cat:"Nuts & Seeds", cal:579, pro:21.2, carb:21.6, fat:49.9, fib:12.5, fibSol:1.7,  fibInsol:10.8, fatSat:3.8,  fatMufa:31.6, fatPufa:12.3, aaHis:0.57, aaIle:0.70, aaLeu:1.47, aaLys:0.58, aaMet:0.15, aaPhe:1.12, aaThr:0.59, aaTrp:0.21, aaVal:0.82, iron:3.7,  calc:264, zinc:3.1, b12:0,    vitD:0,   omega3:0.003,iod:0,  sel:4.1,  mag:270, pot:733,  fol:44  },
{ id:"chia_seeds",     name:"Chia Seeds",               cat:"Nuts & Seeds", cal:486, pro:16.5, carb:42.1, fat:30.7, fib:34.4, fibSol:27.5, fibInsol:6.9,  fatSat:3.3,  fatMufa:2.3,  fatPufa:23.7, aaHis:0.38, aaIle:0.60, aaLeu:1.02, aaLys:0.97, aaMet:0.30, aaPhe:0.86, aaThr:0.59, aaTrp:0.44, aaVal:0.79, iron:7.7,  calc:631, zinc:4.6, b12:0,    vitD:0,   omega3:17.8, iod:0,  sel:55.2, mag:335, pot:407,  fol:49  },
{ id:"flaxseed",       name:"Flaxseed (ground)",        cat:"Nuts & Seeds", cal:534, pro:18.3, carb:28.9, fat:42.2, fib:27.3, fibSol:9.4,  fibInsol:17.9, fatSat:3.7,  fatMufa:7.5,  fatPufa:28.7, aaHis:0.48, aaIle:0.83, aaLeu:1.24, aaLys:0.86, aaMet:0.37, aaPhe:0.96, aaThr:0.77, aaTrp:0.30, aaVal:1.07, iron:5.7,  calc:255, zinc:4.3, b12:0,    vitD:0,   omega3:22.8, iod:0,  sel:25.4, mag:392, pot:813,  fol:87  },
{ id:"sunflower_seeds",name:"Sunflower Seeds",          cat:"Nuts & Seeds", cal:584, pro:20.8, carb:20.0, fat:51.5, fib:8.6,  fibSol:1.1,  fibInsol:7.5,  fatSat:4.5,  fatMufa:18.5, fatPufa:23.1, aaHis:0.54, aaIle:0.98, aaLeu:1.54, aaLys:0.84, aaMet:0.49, aaPhe:1.17, aaThr:0.87, aaTrp:0.30, aaVal:1.17, iron:5.3,  calc:78,  zinc:5.0, b12:0,    vitD:0,   omega3:0.07, iod:0,  sel:53.0, mag:325, pot:645,  fol:227 },
{ id:"cashews",        name:"Cashews",                  cat:"Nuts & Seeds", cal:553, pro:18.2, carb:30.2, fat:43.9, fib:3.3,  fibSol:0.6,  fibInsol:2.7,  fatSat:7.8,  fatMufa:23.8, fatPufa:7.8,  aaHis:0.44, aaIle:0.79, aaLeu:1.47, aaLys:0.93, aaMet:0.36, aaPhe:0.95, aaThr:0.69, aaTrp:0.27, aaVal:1.10, iron:6.7,  calc:37,  zinc:5.8, b12:0,    vitD:0,   omega3:0.16, iod:0,  sel:19.9, mag:292, pot:660,  fol:25  },
{ id:"walnuts",        name:"Walnuts",                  cat:"Nuts & Seeds", cal:654, pro:15.2, carb:13.7, fat:65.2, fib:6.7,  fibSol:1.3,  fibInsol:5.4,  fatSat:6.1,  fatMufa:8.9,  fatPufa:47.2, aaHis:0.39, aaIle:0.67, aaLeu:1.17, aaLys:0.42, aaMet:0.24, aaPhe:0.71, aaThr:0.59, aaTrp:0.17, aaVal:0.75, iron:2.9,  calc:98,  zinc:3.1, b12:0,    vitD:0,   omega3:9.08, iod:0,  sel:4.9,  mag:158, pot:441,  fol:98  },
{ id:"sesame_seeds",   name:"Sesame Seeds",             cat:"Nuts & Seeds", cal:573, pro:17.7, carb:23.5, fat:49.7, fib:11.8, fibSol:1.6,  fibInsol:10.2, fatSat:7.0,  fatMufa:18.8, fatPufa:21.8, aaHis:0.52, aaIle:0.74, aaLeu:1.36, aaLys:0.37, aaMet:0.59, aaPhe:0.93, aaThr:0.73, aaTrp:0.30, aaVal:0.98, iron:14.6, calc:975, zinc:7.8, b12:0,    vitD:0,   omega3:0.38, iod:0,  sel:34.4, mag:351, pot:468,  fol:97  },
{ id:"tahini",         name:"Tahini",                   cat:"Nuts & Seeds", cal:595, pro:17.0, carb:21.2, fat:53.8, fib:9.3,  fibSol:1.3,  fibInsol:8.0,  fatSat:7.5,  fatMufa:20.7, fatPufa:23.6, aaHis:0.48, aaIle:0.68, aaLeu:1.26, aaLys:0.34, aaMet:0.54, aaPhe:0.86, aaThr:0.68, aaTrp:0.28, aaVal:0.91, iron:8.9,  calc:426, zinc:4.6, b12:0,    vitD:0,   omega3:0.39, iod:0,  sel:34.4, mag:95,  pot:414,  fol:98  },
{ id:"broccoli",       name:"Broccoli (raw)",           cat:"Vegetables",   cal:34,  pro:2.8,  carb:6.6,  fat:0.4,  fib:2.6,  fibSol:0.9,  fibInsol:1.7,  fatSat:0.0,  fatMufa:0.0,  fatPufa:0.2,  aaHis:0.05, aaIle:0.07, aaLeu:0.11, aaLys:0.13, aaMet:0.03, aaPhe:0.10, aaThr:0.08, aaTrp:0.03, aaVal:0.11, iron:0.7,  calc:47,  zinc:0.4, b12:0,    vitD:0,   omega3:0.17, iod:0,  sel:2.5,  mag:21,  pot:316,  fol:63  },
{ id:"spinach",        name:"Spinach (raw)",            cat:"Vegetables",   cal:23,  pro:2.9,  carb:3.6,  fat:0.4,  fib:2.2,  fibSol:0.5,  fibInsol:1.7,  fatSat:0.1,  fatMufa:0.0,  fatPufa:0.2,  aaHis:0.06, aaIle:0.10, aaLeu:0.16, aaLys:0.17, aaMet:0.05, aaPhe:0.12, aaThr:0.10, aaTrp:0.04, aaVal:0.13, iron:2.7,  calc:99,  zinc:0.5, b12:0,    vitD:0,   omega3:0.14, iod:0,  sel:1.0,  mag:79,  pot:558,  fol:194 },
{ id:"kale",           name:"Kale (raw)",               cat:"Vegetables",   cal:49,  pro:4.3,  carb:8.8,  fat:0.9,  fib:3.6,  fibSol:0.5,  fibInsol:3.1,  fatSat:0.1,  fatMufa:0.1,  fatPufa:0.3,  aaHis:0.09, aaIle:0.13, aaLeu:0.19, aaLys:0.19, aaMet:0.04, aaPhe:0.14, aaThr:0.13, aaTrp:0.04, aaVal:0.14, iron:1.5,  calc:150, zinc:0.6, b12:0,    vitD:0,   omega3:0.18, iod:0,  sel:0.9,  mag:47,  pot:491,  fol:141 },
{ id:"sweet_potato",   name:"Sweet Potato (cooked)",   cat:"Vegetables",   cal:90,  pro:2.0,  carb:20.7, fat:0.1,  fib:3.3,  fibSol:1.1,  fibInsol:2.2,  fatSat:0.0,  fatMufa:0.0,  fatPufa:0.1,  aaHis:0.04, aaIle:0.06, aaLeu:0.09, aaLys:0.07, aaMet:0.02, aaPhe:0.09, aaThr:0.07, aaTrp:0.02, aaVal:0.09, iron:0.7,  calc:38,  zinc:0.3, b12:0,    vitD:0,   omega3:0.01, iod:0,  sel:0.6,  mag:27,  pot:475,  fol:6   },
{ id:"potato",         name:"Potato (cooked)",          cat:"Vegetables",   cal:87,  pro:1.9,  carb:20.1, fat:0.1,  fib:1.8,  fibSol:0.6,  fibInsol:1.2,  fatSat:0.0,  fatMufa:0.0,  fatPufa:0.0,  aaHis:0.04, aaIle:0.07, aaLeu:0.10, aaLys:0.11, aaMet:0.03, aaPhe:0.08, aaThr:0.07, aaTrp:0.02, aaVal:0.10, iron:0.3,  calc:5,   zinc:0.3, b12:0,    vitD:0,   omega3:0.01, iod:0,  sel:0.4,  mag:22,  pot:328,  fol:9   },
{ id:"tomato",         name:"Tomato (raw)",             cat:"Vegetables",   cal:18,  pro:0.9,  carb:3.9,  fat:0.2,  fib:1.2,  fibSol:0.3,  fibInsol:0.9,  fatSat:0.0,  fatMufa:0.0,  fatPufa:0.1,  aaHis:0.02, aaIle:0.02, aaLeu:0.03, aaLys:0.03, aaMet:0.01, aaPhe:0.03, aaThr:0.03, aaTrp:0.01, aaVal:0.03, iron:0.3,  calc:10,  zinc:0.2, b12:0,    vitD:0,   omega3:0.003,iod:0,  sel:0.4,  mag:11,  pot:237,  fol:15  },
{ id:"onion",          name:"Onion (raw)",              cat:"Vegetables",   cal:40,  pro:1.1,  carb:9.3,  fat:0.1,  fib:1.7,  fibSol:0.9,  fibInsol:0.8,  fatSat:0.0,  fatMufa:0.0,  fatPufa:0.0,  aaHis:0.02, aaIle:0.03, aaLeu:0.04, aaLys:0.05, aaMet:0.01, aaPhe:0.03, aaThr:0.03, aaTrp:0.01, aaVal:0.04, iron:0.2,  calc:23,  zinc:0.2, b12:0,    vitD:0,   omega3:0.01, iod:0,  sel:0.5,  mag:10,  pot:146,  fol:19  },
{ id:"carrot",         name:"Carrot (raw)",             cat:"Vegetables",   cal:41,  pro:0.9,  carb:9.6,  fat:0.2,  fib:2.8,  fibSol:1.1,  fibInsol:1.7,  fatSat:0.0,  fatMufa:0.0,  fatPufa:0.1,  aaHis:0.02, aaIle:0.02, aaLeu:0.04, aaLys:0.04, aaMet:0.01, aaPhe:0.03, aaThr:0.03, aaTrp:0.01, aaVal:0.04, iron:0.3,  calc:33,  zinc:0.2, b12:0,    vitD:0,   omega3:0.002,iod:0,  sel:0.1,  mag:12,  pot:320,  fol:19  },
{ id:"avocado",        name:"Avocado",                  cat:"Vegetables",   cal:160, pro:2.0,  carb:8.5,  fat:14.7, fib:6.7,  fibSol:2.1,  fibInsol:4.6,  fatSat:2.1,  fatMufa:9.8,  fatPufa:1.8,  aaHis:0.05, aaIle:0.07, aaLeu:0.12, aaLys:0.13, aaMet:0.04, aaPhe:0.10, aaThr:0.07, aaTrp:0.02, aaVal:0.10, iron:0.6,  calc:12,  zinc:0.6, b12:0,    vitD:0,   omega3:0.11, iod:0,  sel:0.4,  mag:29,  pot:485,  fol:81  },
{ id:"bell_pepper",    name:"Bell Pepper (raw)",        cat:"Vegetables",   cal:26,  pro:1.0,  carb:6.0,  fat:0.2,  fib:2.1,  fibSol:0.6,  fibInsol:1.5,  fatSat:0.0,  fatMufa:0.0,  fatPufa:0.1,  aaHis:0.02, aaIle:0.03, aaLeu:0.04, aaLys:0.05, aaMet:0.01, aaPhe:0.03, aaThr:0.03, aaTrp:0.01, aaVal:0.04, iron:0.4,  calc:7,   zinc:0.1, b12:0,    vitD:0,   omega3:0.03, iod:0,  sel:0.1,  mag:10,  pot:211,  fol:46  },
{ id:"corn",           name:"Corn (cooked)",            cat:"Vegetables",   cal:96,  pro:3.4,  carb:21.0, fat:1.5,  fib:2.4,  fibSol:0.2,  fibInsol:2.2,  fatSat:0.2,  fatMufa:0.4,  fatPufa:0.7,  aaHis:0.09, aaIle:0.11, aaLeu:0.35, aaLys:0.10, aaMet:0.07, aaPhe:0.15, aaThr:0.12, aaTrp:0.02, aaVal:0.16, iron:0.5,  calc:2,   zinc:0.5, b12:0,    vitD:0,   omega3:0.02, iod:0,  sel:0.6,  mag:26,  pot:270,  fol:46  },
{ id:"cassava",        name:"Cassava (cooked)",         cat:"Vegetables",   cal:160, pro:1.4,  carb:38.1, fat:0.3,  fib:1.8,  fibSol:0.4,  fibInsol:1.4,  fatSat:0.1,  fatMufa:0.1,  fatPufa:0.1,  aaHis:0.03, aaIle:0.05, aaLeu:0.07, aaLys:0.06, aaMet:0.02, aaPhe:0.05, aaThr:0.05, aaTrp:0.02, aaVal:0.06, iron:0.3,  calc:16,  zinc:0.3, b12:0,    vitD:0,   omega3:0,    iod:0,  sel:0.7,  mag:21,  pot:271,  fol:27  },
{ id:"plantain",       name:"Plantain (cooked)",        cat:"Vegetables",   cal:122, pro:0.8,  carb:31.9, fat:0.1,  fib:2.3,  fibSol:0.6,  fibInsol:1.7,  fatSat:0.0,  fatMufa:0.0,  fatPufa:0.0,  aaHis:0.02, aaIle:0.03, aaLeu:0.05, aaLys:0.05, aaMet:0.02, aaPhe:0.04, aaThr:0.03, aaTrp:0.01, aaVal:0.05, iron:0.6,  calc:3,   zinc:0.1, b12:0,    vitD:0,   omega3:0.05, iod:0,  sel:1.5,  mag:32,  pot:465,  fol:23  },
{ id:"banana",         name:"Banana",                   cat:"Fruits",       cal:89,  pro:1.1,  carb:22.8, fat:0.3,  fib:2.6,  fibSol:0.7,  fibInsol:1.9,  fatSat:0.1,  fatMufa:0.0,  fatPufa:0.1,  aaHis:0.09, aaIle:0.03, aaLeu:0.07, aaLys:0.05, aaMet:0.01, aaPhe:0.05, aaThr:0.03, aaTrp:0.01, aaVal:0.05, iron:0.3,  calc:5,   zinc:0.2, b12:0,    vitD:0,   omega3:0.03, iod:0,  sel:1.0,  mag:27,  pot:358,  fol:20  },
{ id:"orange",         name:"Orange",                   cat:"Fruits",       cal:47,  pro:0.9,  carb:11.8, fat:0.1,  fib:2.4,  fibSol:1.2,  fibInsol:1.2,  fatSat:0.0,  fatMufa:0.0,  fatPufa:0.0,  aaHis:0.02, aaIle:0.02, aaLeu:0.03, aaLys:0.05, aaMet:0.02, aaPhe:0.03, aaThr:0.02, aaTrp:0.01, aaVal:0.04, iron:0.1,  calc:40,  zinc:0.1, b12:0,    vitD:0,   omega3:0.01, iod:0,  sel:0.5,  mag:10,  pot:181,  fol:30  },
{ id:"mango",          name:"Mango",                    cat:"Fruits",       cal:60,  pro:0.8,  carb:15.0, fat:0.4,  fib:1.6,  fibSol:0.6,  fibInsol:1.0,  fatSat:0.1,  fatMufa:0.1,  fatPufa:0.1,  aaHis:0.02, aaIle:0.03, aaLeu:0.05, aaLys:0.07, aaMet:0.01, aaPhe:0.03, aaThr:0.03, aaTrp:0.01, aaVal:0.04, iron:0.2,  calc:11,  zinc:0.1, b12:0,    vitD:0,   omega3:0.05, iod:0,  sel:0.6,  mag:10,  pot:168,  fol:43  },
{ id:"papaya",         name:"Papaya",                   cat:"Fruits",       cal:43,  pro:0.5,  carb:10.8, fat:0.3,  fib:1.7,  fibSol:0.7,  fibInsol:1.0,  fatSat:0.1,  fatMufa:0.1,  fatPufa:0.1,  aaHis:0.01, aaIle:0.01, aaLeu:0.02, aaLys:0.03, aaMet:0.01, aaPhe:0.02, aaThr:0.02, aaTrp:0.01, aaVal:0.02, iron:0.3,  calc:24,  zinc:0.1, b12:0,    vitD:0,   omega3:0.01, iod:0,  sel:0.6,  mag:21,  pot:182,  fol:37  },
{ id:"apple",          name:"Apple",                    cat:"Fruits",       cal:52,  pro:0.3,  carb:13.8, fat:0.2,  fib:2.4,  fibSol:1.0,  fibInsol:1.4,  fatSat:0.0,  fatMufa:0.0,  fatPufa:0.0,  aaHis:0.01, aaIle:0.01, aaLeu:0.01, aaLys:0.02, aaMet:0.00, aaPhe:0.01, aaThr:0.01, aaTrp:0.00, aaVal:0.01, iron:0.1,  calc:6,   zinc:0.04,b12:0,    vitD:0,   omega3:0.009,iod:0,  sel:0.02, mag:5,   pot:107,  fol:3   },
{ id:"dates",          name:"Dates (dried)",            cat:"Fruits",       cal:277, pro:1.8,  carb:75.0, fat:0.2,  fib:6.7,  fibSol:1.0,  fibInsol:5.7,  fatSat:0.0,  fatMufa:0.0,  fatPufa:0.0,  aaHis:0.05, aaIle:0.06, aaLeu:0.11, aaLys:0.07, aaMet:0.02, aaPhe:0.08, aaThr:0.06, aaTrp:0.01, aaVal:0.09, iron:0.9,  calc:39,  zinc:0.4, b12:0,    vitD:0,   omega3:0,    iod:0,  sel:3.0,  mag:54,  pot:696,  fol:15  },
{ id:"oat_milk",       name:"Oat Milk",                 cat:"Dairy Alt",    cal:43,  pro:1.0,  carb:7.0,  fat:1.5,  fib:0.8,  fibSol:0.5,  fibInsol:0.3,  fatSat:0.2,  fatMufa:0.7,  fatPufa:0.4,  aaHis:0.03, aaIle:0.04, aaLeu:0.07, aaLys:0.04, aaMet:0.02, aaPhe:0.05, aaThr:0.03, aaTrp:0.02, aaVal:0.05, iron:0.2,  calc:120, zinc:0.1, b12:0.4,  vitD:1.0, omega3:0.05, iod:5,  sel:0.5,  mag:10,  pot:62,   fol:5   },
{ id:"soy_milk",       name:"Soy Milk",                 cat:"Dairy Alt",    cal:54,  pro:3.3,  carb:6.3,  fat:1.8,  fib:0.4,  fibSol:0.1,  fibInsol:0.3,  fatSat:0.3,  fatMufa:0.4,  fatPufa:1.0,  aaHis:0.09, aaIle:0.15, aaLeu:0.26, aaLys:0.21, aaMet:0.05, aaPhe:0.17, aaThr:0.13, aaTrp:0.04, aaVal:0.16, iron:0.5,  calc:120, zinc:0.2, b12:0.6,  vitD:1.0, omega3:0.25, iod:5,  sel:2.5,  mag:19,  pot:118,  fol:18  },
{ id:"soy_cream",      name:"Soy Cream",                cat:"Dairy Alt",    cal:100, pro:1.5,  carb:5.0,  fat:8.0,  fib:0,    fibSol:0,    fibInsol:0,    fatSat:1.2,  fatMufa:1.8,  fatPufa:4.4,  aaHis:0.04, aaIle:0.06, aaLeu:0.12, aaLys:0.09, aaMet:0.02, aaPhe:0.08, aaThr:0.06, aaTrp:0.02, aaVal:0.07, iron:0.1,  calc:15,  zinc:0.1, b12:0.3,  vitD:0,   omega3:0.1,  iod:0,  sel:0.5,  mag:5,   pot:60,   fol:2   },
{ id:"coconut_milk",   name:"Coconut Milk (canned)",    cat:"Dairy Alt",    cal:197, pro:2.3,  carb:5.5,  fat:19.4, fib:0,    fibSol:0,    fibInsol:0,    fatSat:17.2, fatMufa:0.8,  fatPufa:0.2,  aaHis:0.06, aaIle:0.09, aaLeu:0.17, aaLys:0.14, aaMet:0.05, aaPhe:0.12, aaThr:0.09, aaTrp:0.02, aaVal:0.14, iron:1.6,  calc:16,  zinc:0.7, b12:0,    vitD:0,   omega3:0,    iod:0,  sel:6.2,  mag:37,  pot:263,  fol:16  },
{ id:"soy_yogurt",     name:"Soy Yogurt (plain)",       cat:"Dairy Alt",    cal:60,  pro:3.0,  carb:7.0,  fat:2.0,  fib:0.4,  fibSol:0.1,  fibInsol:0.3,  fatSat:0.3,  fatMufa:0.5,  fatPufa:1.1,  aaHis:0.08, aaIle:0.13, aaLeu:0.23, aaLys:0.18, aaMet:0.04, aaPhe:0.15, aaThr:0.11, aaTrp:0.04, aaVal:0.14, iron:0.4,  calc:120, zinc:0.3, b12:0.5,  vitD:1.0, omega3:0.1,  iod:5,  sel:2.0,  mag:17,  pot:141,  fol:9   },
{ id:"olive_oil",      name:"Olive Oil",                cat:"Oils",         cal:884, pro:0,    carb:0,    fat:100,  fib:0,    fibSol:0,    fibInsol:0,    fatSat:13.8, fatMufa:73.0, fatPufa:10.5, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.6,  calc:1,   zinc:0,   b12:0,    vitD:0,   omega3:0.76, iod:0,  sel:0,    mag:0,   pot:1,    fol:0   },
{ id:"sunflower_oil",  name:"Sunflower Oil",            cat:"Oils",         cal:884, pro:0,    carb:0,    fat:100,  fib:0,    fibSol:0,    fibInsol:0,    fatSat:10.1, fatMufa:19.5, fatPufa:65.7, aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0,    calc:0,   zinc:0,   b12:0,    vitD:0,   omega3:0.21, iod:0,  sel:0,    mag:0,   pot:0,    fol:0   },
{ id:"coconut_oil",    name:"Coconut Oil",              cat:"Oils",         cal:862, pro:0,    carb:0,    fat:100,  fib:0,    fibSol:0,    fibInsol:0,    fatSat:82.5, fatMufa:6.3,  fatPufa:1.7,  aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0,    calc:0,   zinc:0,   b12:0,    vitD:0,   omega3:0,    iod:0,  sel:0,    mag:0,   pot:0,    fol:0   },
{ id:"nooch",          name:"Nutritional Yeast",        cat:"Other",        cal:325, pro:50.0, carb:25.0, fat:7.5,  fib:7.0,  fibSol:2.3,  fibInsol:4.7,  fatSat:1.1,  fatMufa:1.0,  fatPufa:4.6,  aaHis:1.05, aaIle:2.26, aaLeu:3.71, aaLys:3.21, aaMet:0.73, aaPhe:2.14, aaThr:2.30, aaTrp:0.60, aaVal:2.68, iron:6.0,  calc:30,  zinc:6.0, b12:24.0, vitD:0,   omega3:0,    iod:0,  sel:100,  mag:231, pot:1000, fol:1270},
{ id:"sugar_brown",    name:"Brown Sugar",              cat:"Other",        cal:380, pro:0.1,  carb:97.3, fat:0,    fib:0,    fibSol:0,    fibInsol:0,    fatSat:0,    fatMufa:0,    fatPufa:0,    aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:1.9,  calc:83,  zinc:0.2, b12:0,    vitD:0,   omega3:0,    iod:0,  sel:1.2,  mag:29,  pot:346,  fol:1   },
{ id:"sugar_white",    name:"White Sugar",              cat:"Other",        cal:387, pro:0,    carb:100,  fat:0,    fib:0,    fibSol:0,    fibInsol:0,    fatSat:0,    fatMufa:0,    fatPufa:0,    aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.1,  calc:1,   zinc:0,   b12:0,    vitD:0,   omega3:0,    iod:0,  sel:0.6,  mag:0,   pot:2,    fol:0   },
{ id:"soy_sauce",      name:"Soy Sauce",                cat:"Other",        cal:53,  pro:8.1,  carb:4.9,  fat:0.6,  fib:0.8,  fibSol:0.3,  fibInsol:0.5,  fatSat:0.1,  fatMufa:0.1,  fatPufa:0.3,  aaHis:0.18, aaIle:0.24, aaLeu:0.47, aaLys:0.30, aaMet:0.08, aaPhe:0.30, aaThr:0.24, aaTrp:0.07, aaVal:0.28, iron:2.4,  calc:20,  zinc:0.5, b12:0,    vitD:0,   omega3:0.04, iod:0,  sel:0.3,  mag:40,  pot:435,  fol:18  },
{ id:"vegan_mayo",     name:"Vegan Mayonnaise",         cat:"Other",        cal:650, pro:0.5,  carb:4.0,  fat:72.0, fib:0,    fibSol:0,    fibInsol:0,    fatSat:6.5,  fatMufa:20.0, fatPufa:41.5, aaHis:0, aaIle:0, aaLeu:0.01, aaLys:0.01, aaMet:0, aaPhe:0.01, aaThr:0.01, aaTrp:0, aaVal:0.01, iron:0.1,  calc:10,  zinc:0.1, b12:0,    vitD:0,   omega3:0.5,  iod:0,  sel:0.3,  mag:2,   pot:40,   fol:2   },
{ id:"cornflakes",     name:"Cornflakes",               cat:"Packaged",     cal:375, pro:7.0,  carb:84.0, fat:0.4,  fib:3.0,  fibSol:0.7,  fibInsol:2.3,  fatSat:0.1,  fatMufa:0.1,  fatPufa:0.2,  aaHis:0.18, aaIle:0.27, aaLeu:0.90, aaLys:0.19, aaMet:0.14, aaPhe:0.38, aaThr:0.24, aaTrp:0.07, aaVal:0.40, iron:8.0,  calc:6,   zinc:1.5, b12:1.0,  vitD:2.1, omega3:0,    iod:5,  sel:4.0,  mag:22,  pot:100,  fol:140 },
{ id:"muesli",         name:"Muesli",                   cat:"Packaged",     cal:350, pro:10.0, carb:62.0, fat:7.0,  fib:8.0,  fibSol:2.7,  fibInsol:5.3,  fatSat:1.2,  fatMufa:2.6,  fatPufa:2.7,  aaHis:0.26, aaIle:0.42, aaLeu:0.87, aaLys:0.36, aaMet:0.19, aaPhe:0.57, aaThr:0.36, aaTrp:0.12, aaVal:0.55, iron:4.5,  calc:80,  zinc:2.5, b12:0,    vitD:0,   omega3:0.15, iod:0,  sel:8.0,  mag:100, pot:370,  fol:50  },
{ id:"dark_chocolate", name:"Dark Chocolate (70%+)",    cat:"Packaged",     cal:600, pro:7.8,  carb:45.8, fat:42.6, fib:10.9, fibSol:1.8,  fibInsol:9.1,  fatSat:24.5, fatMufa:13.2, fatPufa:1.3,  aaHis:0.20, aaIle:0.27, aaLeu:0.49, aaLys:0.31, aaMet:0.09, aaPhe:0.38, aaThr:0.26, aaTrp:0.13, aaVal:0.40, iron:11.9, calc:73,  zinc:3.3, b12:0,    vitD:0,   omega3:0.11, iod:0,  sel:6.8,  mag:228, pot:715,  fol:18  },
{ id:"protein_powder", name:"Vegan Protein Powder",     cat:"Packaged",     cal:380, pro:75.0, carb:10.0, fat:5.0,  fib:3.0,  fibSol:1.0,  fibInsol:2.0,  fatSat:1.0,  fatMufa:1.5,  fatPufa:2.0,  aaHis:1.68, aaIle:3.41, aaLeu:6.05, aaLys:4.27, aaMet:0.87, aaPhe:3.72, aaThr:2.87, aaTrp:0.84, aaVal:3.74, iron:5.0,  calc:100, zinc:3.0, b12:1.5,  vitD:0,   omega3:0,    iod:0,  sel:10.0, mag:60,  pot:300,  fol:60  },
{ id:"red_wine",       name:"Red Wine (per 100ml)",      cat:"Alcohol",     cal:85,  pro:0.1,  carb:2.6,  fat:0,    fib:0,    fibSol:0,    fibInsol:0,    fatSat:0,    fatMufa:0,    fatPufa:0,    aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.5,  calc:8,   zinc:0.1, b12:0,    vitD:0,   omega3:0,    iod:0,  sel:0.2,  mag:12,  pot:127,  fol:1   },
{ id:"white_wine",     name:"White Wine (per 100ml)",    cat:"Alcohol",     cal:82,  pro:0.1,  carb:2.6,  fat:0,    fib:0,    fibSol:0,    fibInsol:0,    fatSat:0,    fatMufa:0,    fatPufa:0,    aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0.3,  calc:9,   zinc:0.1, b12:0,    vitD:0,   omega3:0,    iod:0,  sel:0.1,  mag:10,  pot:71,   fol:0   },
{ id:"beer_lager",     name:"Beer / Lager (per 100ml)",  cat:"Alcohol",     cal:43,  pro:0.5,  carb:3.5,  fat:0,    fib:0,    fibSol:0,    fibInsol:0,    fatSat:0,    fatMufa:0,    fatPufa:0,    aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0,    calc:4,   zinc:0.1, b12:0,    vitD:0,   omega3:0,    iod:0,  sel:0.6,  mag:6,   pot:27,   fol:6   },
{ id:"spirit",         name:"Spirit 40% ABV (per 100ml)",cat:"Alcohol",     cal:231, pro:0,    carb:0,    fat:0,    fib:0,    fibSol:0,    fibInsol:0,    fatSat:0,    fatMufa:0,    fatPufa:0,    aaHis:0, aaIle:0, aaLeu:0, aaLys:0, aaMet:0, aaPhe:0, aaThr:0, aaTrp:0, aaVal:0, iron:0,    calc:0,   zinc:0,   b12:0,    vitD:0,   omega3:0,    iod:0,  sel:0,    mag:0,   pot:2,    fol:0   },
];

// ── WORKER CONFIG ─────────────────────────────────────────────────────────
const WORKER_URL = "https://nutritrack-proxy.nickkropf.workers.dev";
const WORKER_FETCH_CONCURRENCY = 3;
const SUPP_DOSE_UNITS = ["mcg","mg","g","IU","tablet","capsule","ml","tsp","tbsp"];

const UNIT_TO_G = {g:1,gram:1,grams:1,kg:1000,ml:1,milliliter:1,millilitre:1,milliliters:1,millilitres:1,l:1000,liter:1,litre:1,liters:1,litres:1,tsp:5,teaspoon:5,teaspoons:5,tbsp:15,tablespoon:15,tablespoons:15,cup:240,cups:240,oz:28.35,ounce:28.35,ounces:28.35,lb:453.6,pound:453.6,pounds:453.6,whole:1,piece:1,pinch:1};
function toGrams(amount, unit) { const f = UNIT_TO_G[(unit||"g").toLowerCase()] ?? 1; return Math.round(amount * f * 10) / 10; }

const USE_REGEX_PARSER = true;

const TYPICAL_WEIGHT_G = {"onion":110,"onion small":70,"onion medium":110,"onion large":150,"garlic clove":3,"garlic":3,"shallot":30,"spring onion":15,"leek":150,"leek stick":150,"tomato":120,"tomato small":70,"tomato medium":120,"tomato large":180,"cherry tomato":17,"lemon":65,"lime":45,"orange":140,"apple":180,"pear":180,"banana":120,"avocado":150,"potato":170,"sweet potato":180,"carrot":60,"beetroot":150,"bell pepper":120,"capsicum":120,"cucumber":200,"bay leaf":0.5,"thyme sprig":1,"thyme":1,"rosemary sprig":2,"rosemary":2,"parsley sprig":2,"sage leaf":0.3,"chili":5,"chilli":5,"chili pepper":5,"chilli pepper":5};
const COUNT_NOUNS = new Set(["clove","cloves","slice","slices","sprig","sprigs","piece","pieces","head","heads","stalk","stalks","stick","sticks","bunch","bunches"]);
const SIZE_ADJECTIVES = new Set(["small","medium","large"]);
const LEADING_QUALIFIERS = /^(about|approximately|approx\.?|roughly|around|~)\s+/i;
const PREP_MODIFIERS = new Set(["minced","chopped","diced","sliced","crushed","grated","shredded","peeled","cubed","halved","quartered","julienned","mashed","ground","fresh","dried","frozen","raw","cooked","roasted","toasted","finely","coarsely","thinly","thickly","lightly","freshly","optional","divided","softened","melted","chilled","cold","warm","hot"]);
const FOOD_IDENTITY_MODIFIERS = new Set(["vinegar","juice","oil","paste","sauce","powder","extract","syrup","butter","cream","milk","flour","stock","broth","wine"]);

function isModifierMismatch(ingredientName, foodBaseName) {
  const ingTokens = ingredientName.toLowerCase().split(/\s+/).filter(Boolean);
  const foodTokens = foodBaseName.toLowerCase().split(/\s+/).filter(Boolean);
  if (!ingTokens.length) return false;
  const last = ingTokens[ingTokens.length - 1];
  if (!FOOD_IDENTITY_MODIFIERS.has(last)) return false;
  return !foodTokens.includes(last);
}

function fuzzyMatchFood(name, allFoods) {
  if (!name) return null;
  const n = name.toLowerCase().trim();
  let m = allFoods.find(f => f.name.toLowerCase() === n);
  if (m) return m;
  m = allFoods.find(f => f.name.toLowerCase().startsWith(n) && n.length > 3);
  if (m) return m;
  m = allFoods.find(f => {
    const base = f.name.toLowerCase().split(" (")[0];
    if (base.length <= 3 || !n.includes(base) || isModifierMismatch(n, base)) return false;
    return true;
  });
  if (m) return m;
  m = allFoods.find(f => f.name.toLowerCase().includes(n) && n.length > 3);
  if (m) return m;
  m = allFoods.find(f => {
    const SKIP = new Set(["dry","cooked","raw","ground","firm","plain","canned","rolled","per","100ml","abv"]);
    const words = f.name.toLowerCase().replace(/[()]/g,"").split(" ").filter(w => w.length > 3 && !SKIP.has(w));
    if (!words.length || !words.every(w => n.includes(w))) return false;
    const base = f.name.toLowerCase().split(" (")[0];
    return !isModifierMismatch(n, base);
  });
  return m || null;
}

function workerHeaders() { return { "Content-Type": "application/json" }; }
async function workerFetch(path, init) {
  let res;
  try { res = await fetch(`${WORKER_URL}${path}`, init); }
  catch (e) { throw new Error(`network: ${e.message || "fetch failed"}`); }
  let data = null;
  try { data = await res.json(); } catch {}
  if (!res.ok) { const r = (data && (data.reason || data.error || data.detail)) || `http_${res.status}`; throw new Error(`worker_${res.status}: ${r}`); }
  return data;
}
async function fetchHealth() { return workerFetch("/health", { method: "GET", headers: workerHeaders() }); }
async function fetchRecipesList(since) { const body = since ? { since } : {}; return workerFetch("/recipes/list", { method: "POST", headers: workerHeaders(), body: JSON.stringify(body) }); }
async function fetchRecipePage(pageId) { return workerFetch("/recipes/page", { method: "POST", headers: workerHeaders(), body: JSON.stringify({ page_id: pageId }) }); }
async function fetchRecipePagesWithProgress(recipes, onProgress) {
  const results = new Array(recipes.length); let cursor = 0, completed = 0;
  async function worker() { while (true) { const idx = cursor++; if (idx >= recipes.length) return; const r = recipes[idx]; try { const d = await fetchRecipePage(r.id); results[idx] = { ...r, ingredientLines: d.ingredientLines || [], warning: d.warning || null }; } catch (e) { results[idx] = { ...r, ingredientLines: [], error: e.message || "fetch failed" }; } completed++; if (onProgress) onProgress(completed); } }
  const pool = Array.from({ length: Math.min(WORKER_FETCH_CONCURRENCY, recipes.length) }, () => worker());
  await Promise.all(pool); return results;
}
async function parseIngredientsWithClaude(ingredientLines) {
  if (!ingredientLines || !ingredientLines.length) return [];
  const prompt = `Parse these ingredient strings into a JSON array. Return ONLY the JSON array.\nEach object: {"name":string,"amount":number,"unit":string}\nIngredients:\n${ingredientLines.map((l,i)=>`${i+1}. ${l}`).join("\n")}`;
  const res = await fetch("https://api.anthropic.com/v1/messages", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 1000, messages: [{ role: "user", content: prompt }] }) });
  const data = await res.json(); const text = (data.content?.[0]?.text || "[]").replace(/```json|```/g,"").trim();
  try { return JSON.parse(text); } catch { return []; }
}
const UNICODE_FRACTIONS = {"\u00BC":0.25,"\u00BD":0.5,"\u00BE":0.75,"\u2153":1/3,"\u2154":2/3,"\u215B":0.125};
const KNOWN_UNITS = new Set(["g","gram","grams","kg","kilogram","kilograms","ml","milliliter","millilitre","milliliters","millilitres","l","liter","litre","liters","litres","tsp","teaspoon","teaspoons","tbsp","tablespoon","tablespoons","tbs","cup","cups","oz","ounce","ounces","lb","lbs","pound","pounds","pinch","pinches","dash","dashes"]);
function normaliseUnit(token) {
  const t = token.toLowerCase();
  if (t==="gram"||t==="grams") return "g"; if (t==="kilogram"||t==="kilograms") return "kg";
  if (t==="milliliter"||t==="millilitre"||t==="milliliters"||t==="millilitres") return "ml";
  if (t==="liter"||t==="litre"||t==="liters"||t==="litres") return "l";
  if (t==="teaspoon"||t==="teaspoons") return "tsp"; if (t==="tablespoon"||t==="tablespoons"||t==="tbs") return "tbsp";
  if (t==="cups") return "cup"; if (t==="ounce"||t==="ounces") return "oz"; if (t==="lbs"||t==="pound"||t==="pounds") return "lb";
  if (t==="pinches") return "pinch"; if (t==="dash"||t==="dashes") return "pinch"; return t;
}
function stripPrepModifiers(tokens) { let arr = tokens.slice(), changed = true; while (changed && arr.length) { changed = false; if (PREP_MODIFIERS.has(arr[arr.length-1].toLowerCase())) { arr = arr.slice(0,-1); changed = true; } if (arr.length && PREP_MODIFIERS.has(arr[0].toLowerCase())) { arr = arr.slice(1); changed = true; } } return arr; }
function singulariseName(name) { const n = name.trim(); if (n.length < 4) return n; if (n.endsWith("ss") || n.endsWith("us")) return n; if (n.endsWith("leaves")) return n.slice(0,-6)+"leaf"; if (n.endsWith("oes") && n.length > 4) return n.slice(0,-2); if (n.endsWith("ies") && n.length > 4) return n.slice(0,-3)+"y"; if (n.endsWith("s")) return n.slice(0,-1); return n; }
function parseQuantity(s) {
  let str = s.trim(); if (!str) return null;
  const fc = str[0]; if (UNICODE_FRACTIONS[fc] !== undefined) return { amount: UNICODE_FRACTIONS[fc], rest: str.slice(1).trim() };
  const ma = str.match(/^(\d+)\s+(\d+)\/(\d+)\b/); if (ma) { const w=parseInt(ma[1]),n=parseInt(ma[2]),d=parseInt(ma[3]); if(d!==0) return { amount: w+n/d, rest: str.slice(ma[0].length).trim() }; }
  const mu = str.match(/^(\d+)\s+([\u00BC-\u00BE\u2153-\u215E])/); if (mu) { const w=parseInt(mu[1]),f=UNICODE_FRACTIONS[mu[2]]; if(f!==undefined) return { amount: w+f, rest: str.slice(mu[0].length).trim() }; }
  const dr = str.match(/^(\d+(?:[.,]\d+)?)\s*[-\u2013\u2014]\s*\d+(?:[.,]\d+)?/); if (dr) return { amount: parseFloat(dr[1].replace(",",".")), rest: str.slice(dr[0].length).trim() };
  const wr = str.match(/^(\d+(?:[.,]\d+)?)\s+to\s+\d+(?:[.,]\d+)?/i); if (wr) return { amount: parseFloat(wr[1].replace(",",".")), rest: str.slice(wr[0].length).trim() };
  const fr = str.match(/^(\d+)\/(\d+)\b/); if (fr) { const n=parseInt(fr[1]),d=parseInt(fr[2]); if(d!==0) return { amount: n/d, rest: str.slice(fr[0].length).trim() }; }
  const nm = str.match(/^(\d+(?:[.,]\d+)?)/); if (nm) return { amount: parseFloat(nm[1].replace(",",".")), rest: str.slice(nm[0].length).trim() };
  return null;
}
function parseIngredientLine(rawLine) {
  if (!rawLine || typeof rawLine !== "string") return null;
  let line = rawLine.replace(/\s+/g," ").trim(); if (!line) return null;
  line = line.replace(LEADING_QUALIFIERS,"").replace(/^~\s*/,"");
  const lp = line.match(/^\(([^)]*)\)\s+/); if (lp) line = lp[1].trim()+" "+line.slice(lp[0].length).trim();
  let parentheticalOverride = null;
  const pm = line.match(/\s*\(([^)]*)\)\s*$/);
  if (pm) { const inner = pm[1].trim(), iq = parseQuantity(inner); if (iq && iq.rest) { const ut = iq.rest.split(/\s+/)[0].toLowerCase().replace(/[.,;:]+$/,""); const OU = new Set(["g","gram","grams","kg","ml","l","oz","ounce","ounces","lb","pound","pounds"]); if (OU.has(ut)) parentheticalOverride = { amount: iq.amount, unit: normaliseUnit(ut) }; } line = line.slice(0, pm.index).trim(); }
  const ac = line.match(/^(.+?[A-Za-z]),\s/); if (ac) line = ac[1].trim(); if (!line) return null;
  let amount, rest, pcu = "";
  const q = parseQuantity(line);
  if (q) { amount = q.amount; rest = q.rest; }
  else { const ft = line.split(/\s+/)[0].toLowerCase().replace(/[.,;:]+$/,""); if (KNOWN_UNITS.has(ft)) { amount = 1; pcu = normaliseUnit(ft); rest = line.slice(line.indexOf(line.split(/\s+/)[0])+line.split(/\s+/)[0].length).trim(); } else return null; }
  if (!rest) return null;
  const tokens = rest.split(/\s+/); if (!tokens.length) return null;
  let unit = pcu, nameTokens = tokens.slice();
  if (!unit) { const fl = tokens[0].toLowerCase(), fs = fl.replace(/[.,;:]+$/,""); if (KNOWN_UNITS.has(fs)) { unit = normaliseUnit(fs); nameTokens = tokens.slice(1); } }
  if (unit && nameTokens.length && nameTokens[0].toLowerCase() === "of") nameTokens = nameTokens.slice(1);
  if (!unit) {
    if (!nameTokens.length) return null;
    let size = ""; if (SIZE_ADJECTIVES.has(nameTokens[0].toLowerCase())) { size = nameTokens[0].toLowerCase(); nameTokens = nameTokens.slice(1); }
    if (!nameTokens.length) return null;
    nameTokens = stripPrepModifiers(nameTokens); if (!nameTokens.length) return null;
    let countNoun = "";
    if (nameTokens.length >= 2 && COUNT_NOUNS.has(nameTokens[nameTokens.length-1].toLowerCase())) { countNoun = nameTokens[nameTokens.length-1].toLowerCase(); nameTokens = nameTokens.slice(0,-1); }
    else if (nameTokens.length >= 2 && COUNT_NOUNS.has(nameTokens[0].toLowerCase())) { countNoun = nameTokens[0].toLowerCase(); nameTokens = nameTokens.slice(1); if (nameTokens.length && nameTokens[0].toLowerCase() === "of") nameTokens = nameTokens.slice(1); }
    if (!nameTokens.length) return null;
    const rawName = nameTokens.join(" ").toLowerCase().trim(), singular = singulariseName(rawName); if (!singular) return null;
    let weight;
    if (countNoun) { const lk = singulariseName(countNoun); weight = TYPICAL_WEIGHT_G[`${singular} ${lk}`] !== undefined ? TYPICAL_WEIGHT_G[`${singular} ${lk}`] : TYPICAL_WEIGHT_G[singular]; }
    else if (size) { weight = TYPICAL_WEIGHT_G[`${singular} ${size}`] !== undefined ? TYPICAL_WEIGHT_G[`${singular} ${size}`] : TYPICAL_WEIGHT_G[singular]; }
    else weight = TYPICAL_WEIGHT_G[singular];
    if (weight === undefined) weight = 100;
    if (parentheticalOverride) return { name: singular, amount: parentheticalOverride.amount, unit: parentheticalOverride.unit };
    return { name: singular, amount: Math.round(amount * weight * 10) / 10, unit: "g" };
  }
  nameTokens = stripPrepModifiers(nameTokens); const name = nameTokens.join(" ").toLowerCase().trim(); if (!name) return null;
  if (parentheticalOverride) return { name, amount: parentheticalOverride.amount, unit: parentheticalOverride.unit };
  return { name, amount, unit };
}
async function parseIngredientsLocal(ingredientLines) { if (!ingredientLines || !ingredientLines.length) return []; return ingredientLines.map(l => { const p = parseIngredientLine(l); return p || { name: (l||"").trim().toLowerCase(), amount: 0, unit: "" }; }); }
async function parseIngredients(ingredientLines) { return USE_REGEX_PARSER ? parseIngredientsLocal(ingredientLines) : parseIngredientsWithClaude(ingredientLines); }
async function parseRecipesFromPasteText(text) {
  const prompt = `Extract all recipes from the following text and return ONLY a JSON array.\nEach recipe: { "title": string, "servings": number, "source": string, "ingredientLines": string[] }\nText:\n${text.slice(0, 8000)}`;
  const res = await fetch("https://api.anthropic.com/v1/messages", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 2000, messages: [{ role: "user", content: prompt }] }) });
  const data = await res.json(); const out = (data.content?.[0]?.text || "[]").replace(/```json|```/g,"").trim();
  try { return JSON.parse(out); } catch { return []; }
}
// ── CONSTANTS ─────────────────────────────────────────────────────────────
// AA_EAR replaced by computeAAGoals(weightKg) — per-kg spreadsheet values
const AA_LABELS = { aaHis:"Histidine", aaIle:"Isoleucine", aaLeu:"Leucine", aaLys:"Lysine", aaMet:"Methionine", aaPhe:"Phenylalanine", aaThr:"Threonine", aaTrp:"Tryptophan", aaVal:"Valine" };
const AA_KEYS   = ["aaHis","aaIle","aaLeu","aaLys","aaMet","aaPhe","aaThr","aaTrp","aaVal"];

const NUTRIENT_META = {
  cal:    { label:"Calories",   unit:"kcal", color:"#F59E0B" },
  pro:    { label:"Protein",    unit:"g",    color:"#3B82F6" },
  carb:   { label:"Carbs",      unit:"g",    color:"#10B981" },
  fat:    { label:"Fat",        unit:"g",    color:"#EF4444" },
  fib:    { label:"Fibre",      unit:"g",    color:"#8B5CF6" },
  iron:   { label:"Iron",       unit:"mg",   color:"#DC2626" },
  calc:   { label:"Calcium",    unit:"mg",   color:"#94A3B8" },
  zinc:   { label:"Zinc",       unit:"mg",   color:"#64748B" },
  b12:    { label:"B12",        unit:"mcg",  color:"#E11D48" },
  vitD:   { label:"Vitamin D",  unit:"mcg",  color:"#FBBF24" },
  omega3: { label:"Omega-3",    unit:"g",    color:"#06B6D4" },
  iod:    { label:"Iodine",     unit:"mcg",  color:"#7C3AED" },
  sel:    { label:"Selenium",   unit:"mcg",  color:"#D97706" },
  mag:    { label:"Magnesium",  unit:"mg",   color:"#059669" },
  pot:    { label:"Potassium",  unit:"mg",   color:"#EA580C" },
  fol:    { label:"Folate",     unit:"mcg",  color:"#16A34A" },
  sod:    { label:"Sodium",     unit:"mg",   color:"#F97316" },
  vitA:   { label:"Vitamin A",  unit:"mcg",  color:"#EAB308" },
  vitC:   { label:"Vitamin C",  unit:"mg",   color:"#84CC16" },
};

const NUTRIENT_ALL_KEYS = ["cal","pro","carb","fat","fib","iron","calc","zinc","b12","vitD","omega3","iod","sel","mag","pot","fol","sod","vitA","vitC"];

// ── Goal computation (spreadsheet formulas, May 2026) ───────────────────
// Source: Nutrient_Tracking_Logic_v1.xlsx
// Protein base: 1g/kg. Dynamic exercise multiplier applied in effectiveGoals (1.0–2.0×).
// Fat: 25% TDEE / 9. Carbs: residual after protein + fat kcal.
// Vegan iron: RDA × 1.8 (non-heme absorption). Vegan zinc: RDA × 1.5 (phytate inhibition).
// Fibre: 14g per 1000 kcal TDEE.
function computeGoals(profile) {
  const wt  = parseFloat(profile?.weightKg) || 70;
  const ht  = parseFloat(profile?.heightCm)  || 170;
  const age = parseFloat(profile?.age)        || 30;
  const male = (profile?.sex || "Male") !== "Female";
  // Mifflin-St Jeor BMR
  const bmr  = (10 * wt) + (6.25 * ht) - (5 * age) + (male ? 5 : -161);
  // TDEE: BMR × 1.1 (TEF/NEAT); Active_Kcal added dynamically via effectiveGoals
  const tdee = Math.round(bmr * 1.1);
  const pro  = Math.round(wt * 1.0);                           // 1g/kg base
  const fat  = Math.round((tdee * 0.25) / 9);                  // 25% TDEE
  const carb = Math.round((tdee - (pro * 4) - (fat * 9)) / 4);// residual
  const fib  = Math.round((tdee / 1000) * 14);                 // 14g/1000kcal
  return {
    cal:  tdee,
    pro,
    carb: Math.max(carb, 50), // floor to avoid negative on high-fat profiles
    fat,
    fib,
    // Vegan-adjusted micros (spreadsheet values)
    iron:   male ? 14.4  : 32.4,   // 8mg/18mg × 1.8
    calc:   1000,
    zinc:   male ? 16.5  : 12.0,   // 11mg/8mg × 1.5
    b12:    2.4,
    vitD:   15,
    omega3: 1.6,
    iod:    150,
    sel:    55,
    mag:    male ? 420   : 320,
    pot:    male ? 3400  : 2600,
    fol:    400,
    sod:    2300,
    vitA:   male ? 900   : 700,
    vitC:   male ? 90    : 75,
  };
}

// Per-kg AA targets from spreadsheet (mg/kg → g for consistency with food DB)
// Met+Cys and Phe+Tyr are combined pools; mapped to aaMet and aaPhe keys respectively.
function computeAAGoals(weightKg) {
  const wt = parseFloat(weightKg) || 70;
  return {
    aaHis: (10  * wt) / 1000,
    aaIle: (20  * wt) / 1000,
    aaLeu: (40  * wt) / 1000,
    aaLys: (38  * wt) / 1000,
    aaMet: (15  * wt) / 1000,  // Met+Cys pool
    aaPhe: (25  * wt) / 1000,  // Phe+Tyr pool
    aaThr: (15  * wt) / 1000,
    aaTrp: (4.8 * wt) / 1000,
    aaVal: (26  * wt) / 1000,
  };
}

const DEFAULT_GOALS   = computeGoals({});
const DEFAULT_PROFILE = { name:"", weightKg:"", heightCm:"", age:"", sex:"" };
const DEFAULT_EX_RATIO = { carb:60, fat:20, pro:20 };
const DEFAULT_SUPPLEMENT_STACKS = [
  { id:"stack_am", name:"AM", items:[] },
  { id:"stack_pm", name:"PM", items:[] },
];

const EXERCISE_ACTIVITIES = [
  { id:"cycling_light",    label:"Cycling",  intensity:"Light",    met:5.8  },
  { id:"cycling_moderate", label:"Cycling",  intensity:"Moderate", met:8.0  },
  { id:"cycling_hard",     label:"Cycling",  intensity:"Hard",     met:10.0 },
  { id:"walking_easy",     label:"Walking",  intensity:"Easy",     met:2.8  },
  { id:"walking_brisk",    label:"Walking",  intensity:"Brisk",    met:3.8  },
  { id:"running_easy",     label:"Running",  intensity:"Easy",     met:8.0  },
  { id:"running_moderate", label:"Running",  intensity:"Moderate", met:10.0 },
  { id:"running_hard",     label:"Running",  intensity:"Hard",     met:12.0 },
];

const MACROS = ["cal","pro","carb","fat","fib"];
const MICROS = ["iron","calc","zinc","b12","vitD","omega3","iod","sel","mag","pot","fol","sod","vitA","vitC"];
const MEALS  = ["Breakfast","Lunch","Dinner","Snack"];

const FIB_SOL_COLOR   = "#8B5CF6";
const FIB_INSOL_COLOR = "#94A3B8";
const FAT_SAT_COLOR   = "#EF4444";
const FAT_MUFA_COLOR  = "#F97316";
const FAT_PUFA_COLOR  = "#06B6D4";

const dateKey = (d) => d.toISOString().slice(0,10);
const today   = () => dateKey(new Date());

const STORAGE_KEYS = {
  logs:             "nt-logs",
  goals:            "nt-goals",
  goalOverrides:    "nt-goal-overrides",
  customFoods:      "nt-custom",
  profile:          "nt-profile",
  exRatio:          "nt-exratio",
  recipes:          "nt-recipes",
  notionStatus:     "nt-notion-status",
  syncQueue:        "nt-sync-queue",
  supplementStacks: "nt-supplement-stacks",
  lastExportedAt:   "nt-last-exported-at",
};

// ── STORAGE ADAPTER (Phase 5.5 fix) ──────────────────────────────────────
// Previous implementation called window.storage.get / window.storage.set,
// which is the artifact-runtime proprietary API. That API does not exist on
// the GitHub Pages harness, so every read silently returned the fallback and
// every write silently no-op'd. Replaced with standard localStorage. The
// async signatures are preserved so no call sites need to change.
async function loadData(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw !== null ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}
async function saveData(key, val) {
  try {
    localStorage.setItem(key, JSON.stringify(val));
  } catch (e) {
    console.error("saveData failed:", key, e);
  }
}

function calcRecipeNutritionPerServing(ingredients, servings, allFoods) {
  const t = {}; Object.keys(NUTRIENT_META).forEach(k => t[k] = 0);
  ingredients.forEach(ing => { const food = allFoods.find(f => f.id === ing.foodId); if (!food) return; const m = ing.amount_g / 100; Object.keys(NUTRIENT_META).forEach(k => { t[k] += (food[k] || 0) * m; }); });
  const s = Math.max(parseFloat(servings) || 1, 0.1); const ps = {}; Object.keys(t).forEach(k => ps[k] = t[k] / s); return ps;
}
function computeEntryNutrition(derivedIngredients, allFoods) {
  const t = {}; Object.keys(NUTRIENT_META).forEach(k => t[k] = 0);
  (derivedIngredients || []).forEach(ing => {
    const m = ing.amount_g / 100;
    if (ing.snapshot) { Object.keys(NUTRIENT_META).forEach(k => { t[k] += (ing.snapshot[k] || 0) * m; }); }
    else { const food = allFoods.find(f => f.id === ing.foodId); if (!food) return; Object.keys(NUTRIENT_META).forEach(k => { t[k] += (food[k] || 0) * m; }); }
  });
  return t;
}
// Phase 5.8 — nutrient-value snapshot helpers
const FOOD_SUBTYPE_KEYS = ["fibSol","fibInsol","fatSat","fatMufa","fatPufa","aaHis","aaIle","aaLeu","aaLys","aaMet","aaPhe","aaThr","aaTrp","aaVal"];
function buildFoodSnapshot(food) {
  const snap = {};
  [...Object.keys(NUTRIENT_META), ...FOOD_SUBTYPE_KEYS].forEach(k => { if (food[k] !== undefined) snap[k] = food[k]; });
  return snap;
}
function suppItemSummary(items) {
  if (!items || !items.length) return "No items";
  return items.slice(0,3).map(i => `${i.name} ${i.dose_amount}${i.dose_unit}`).join(", ") + (items.length > 3 ? ` +${items.length-3} more` : "");
}
// ── COMPONENTS ────────────────────────────────────────────────────────────
function Ring({ value, max, size=52, stroke=5, color, children }) {
  const r = (size - stroke) / 2, circ = 2 * Math.PI * r, pct = Math.min(value / (max || 1), 1);
  return (
    <svg width={size} height={size} style={{ display:"block" }}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#1e293b" strokeWidth={stroke}/>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={stroke}
        strokeDasharray={circ} strokeDashoffset={circ*(1-pct)} strokeLinecap="round"
        transform={`rotate(-90 ${size/2} ${size/2})`} style={{ transition:"stroke-dashoffset 0.5s ease" }}/>
      {children}
    </svg>
  );
}

function SwipeableEntry({ children, onDelete }) {
  const [offsetX, setOffsetX] = useState(0);
  const startX = useRef(null);
  const DEL = 60;
  const onTouchStart = e => { startX.current = e.touches[0].clientX; };
  const onTouchMove  = e => { if (startX.current === null) return; const dx = e.touches[0].clientX - startX.current; if (dx < 0) setOffsetX(Math.max(dx, -DEL-20)); };
  const onTouchEnd   = () => { setOffsetX(offsetX < -DEL ? -DEL : 0); startX.current = null; };
  return (
    <div style={{ position:"relative", overflow:"hidden" }}>
      <div style={{ position:"absolute", right:0, top:0, bottom:0, width:DEL, background:"#ef4444", display:"flex", alignItems:"center", justifyContent:"center", borderRadius:"0 8px 8px 0" }}
        onClick={() => { setOffsetX(0); onDelete(); }}>
        <span style={{ color:"#fff", fontSize:18, fontWeight:700 }}>🗑</span>
      </div>
      <div style={{ transform:`translateX(${offsetX}px)`, transition:startX.current?"none":"transform 0.2s ease", background:"#0a0f1a", position:"relative", zIndex:1 }}
        onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
        {children}
      </div>
    </div>
  );
}
// ── MAIN APP ──────────────────────────────────────────────────────────────
export default function NutriTrack() {
  const [view,             setView]             = useState("log");
  const [logs,             setLogs]             = useState({});
  const [goals,            setGoals]            = useState(DEFAULT_GOALS);
  const [goalOverrides,    setGoalOverrides]    = useState({});
  const [customFoods,      setCustomFoods]      = useState([]);
  const [profile,          setProfile]          = useState(DEFAULT_PROFILE);
  const [exRatio,          setExRatio]          = useState(DEFAULT_EX_RATIO);
  const [recipes,          setRecipes]          = useState([]);
  const [supplementStacks, setSupplementStacks] = useState(DEFAULT_SUPPLEMENT_STACKS);
  const [currentDate,      setCurrentDate]      = useState(today());
  const [loaded,           setLoaded]           = useState(false);

  // Export
  const [lastExportedAt, setLastExportedAt] = useState(null);
  const [exportConfirm,  setExportConfirm]  = useState(null); // null or { csvRows, jsonEntries, dateRange }

  // Notion sync
  const [lastSyncedAt,   setLastSyncedAt]   = useState(null);
  const [syncQueue,      setSyncQueue]      = useState([]);
  const [notionSyncMsg,  setNotionSyncMsg]  = useState(null);
  const [syncInProgress, setSyncInProgress] = useState(false);
  const [syncProgress,   setSyncProgress]   = useState(null);
  const [syncReviewData, setSyncReviewData] = useState([]);
  const [pasteText,      setPasteText]      = useState("");
  const [parserTestText, setParserTestText] = useState("");
  const [notionIngPick,  setNotionIngPick]  = useState(null);
  const [notionIngSearch,setNotionIngSearch]= useState("");

  // Food add/edit
  const [addMode,        setAddMode]        = useState("food");
  const [searchTerm,     setSearchTerm]     = useState("");
  const [selectedFood,   setSelectedFood]   = useState(null);
  const [amount,         setAmount]         = useState("100");
  const [meal,           setMeal]           = useState("Breakfast");
  const [editingEntryId, setEditingEntryId] = useState(null);
  const [detailNutrient, setDetailNutrient] = useState(null);

  // Logged-entry editing (Phase 5.7)
  const [editingLogEntry,     setEditingLogEntry]     = useState(null); // full entry object
  const [editLogServings,     setEditLogServings]     = useState("1");
  const [editLogMeal,         setEditLogMeal]         = useState("Breakfast");
  const [editLogDuration,     setEditLogDuration]     = useState("60");
  const [editLogBurn,         setEditLogBurn]         = useState("");
  const [editLogSuppItems,    setEditLogSuppItems]    = useState([]);
  const [showDeletedFoods,    setShowDeletedFoods]    = useState(false);

  // Exercise
  const [exActivity,  setExActivity]  = useState(EXERCISE_ACTIVITIES[0].id);
  const [exDuration,  setExDuration]  = useState("60");
  const [exBurnEdit,  setExBurnEdit]  = useState("");

  // Custom food
  const [cf, setCf] = useState({ name:"", cat:"Other", cal:"", pro:"", carb:"", fat:"", fib:"", iron:"", calc:"", zinc:"", b12:"", vitD:"", omega3:"", iod:"", sel:"", mag:"", pot:"", fol:"" });

  // Recipe creation
  const [recipeInProgress,  setRecipeInProgress]  = useState({ name:"", source:"", servings:"4", ingredients:[] });
  const [editingRecipeId,   setEditingRecipeId]   = useState(null);
  const [recipeIngSearch,   setRecipeIngSearch]   = useState("");
  const [recipeIngSelected, setRecipeIngSelected] = useState(null);
  const [recipeIngAmount,   setRecipeIngAmount]   = useState("100");

  // Recipe log
  const [selectedRecipe,    setSelectedRecipe]    = useState(null);
  const [recipeLogMode,     setRecipeLogMode]     = useState("servings");
  const [recipeLogServings, setRecipeLogServings] = useState("1");
  const [recipeLogGrams,    setRecipeLogGrams]    = useState("");
  const [recipeLogMeal,     setRecipeLogMeal]     = useState("Breakfast");
  const [recipeLogReturn,   setRecipeLogReturn]   = useState("recipeDetail");

  // Supplement stack editor
  const [editingStackId,   setEditingStackId]   = useState(null);
  const [stackEditorName,  setStackEditorName]  = useState("");
  const [stackEditorItems, setStackEditorItems] = useState([]);

  // Supplement item editor
  const [editingItemIdx,  setEditingItemIdx]  = useState(null);
  const [itemEditorData,  setItemEditorData]  = useState({ name:"", dose_amount:"", dose_unit:"mcg", nutrients:{} });
  const [itemNutKey,      setItemNutKey]      = useState("b12");
  const [itemNutVal,      setItemNutVal]      = useState("");

  // Supplement log confirmation
  const [suppLogStack, setSuppLogStack] = useState(null);
  const [suppLogItems, setSuppLogItems] = useState([]);

  // One-off supplement
  const [oneOffData,   setOneOffData]   = useState({ name:"", dose_amount:"", dose_unit:"mcg", nutrients:{} });
  const [oneOffNutKey, setOneOffNutKey] = useState("b12");
  const [oneOffNutVal, setOneOffNutVal] = useState("");

  const searchRef    = useRef(null);
  const recipeIngRef = useRef(null);

  // ── LOAD ─────────────────────────────────────────────────────────────
  useEffect(() => {
    (async () => {
      const l  = await loadData(STORAGE_KEYS.logs,             {});
      const g  = await loadData(STORAGE_KEYS.goals,            DEFAULT_GOALS);
      const go = await loadData(STORAGE_KEYS.goalOverrides,    {});
      const c  = await loadData(STORAGE_KEYS.customFoods,      []);
      const p  = await loadData(STORAGE_KEYS.profile,          DEFAULT_PROFILE);
      const er = await loadData(STORAGE_KEYS.exRatio,          DEFAULT_EX_RATIO);
      const rc = await loadData(STORAGE_KEYS.recipes,          []);
      const ns = await loadData(STORAGE_KEYS.notionStatus,     { lastSyncedAt: null });
      const sq = await loadData(STORAGE_KEYS.syncQueue,        []);
      const ss = await loadData(STORAGE_KEYS.supplementStacks, DEFAULT_SUPPLEMENT_STACKS);
      const le = await loadData(STORAGE_KEYS.lastExportedAt,   null);
      // Recompute goals from stored profile so they're always fresh on load
      const computedOnLoad = computeGoals(p);
      setLogs(l); setGoals({ ...computedOnLoad, ...g, ...computedOnLoad }); setGoalOverrides(go); setCustomFoods(c); setProfile(p); setExRatio(er); setRecipes(rc);
      setLastSyncedAt(ns.lastSyncedAt); setSyncQueue(sq); setSupplementStacks(ss); setLastExportedAt(le);
      setLoaded(true);
    })();
  }, []);

  useEffect(() => { if (loaded) saveData(STORAGE_KEYS.logs,             logs);             }, [logs,             loaded]);
  useEffect(() => { if (loaded) saveData(STORAGE_KEYS.goals,            goals);            }, [goals,            loaded]);
  useEffect(() => { if (loaded) saveData(STORAGE_KEYS.goalOverrides,    goalOverrides);    }, [goalOverrides,    loaded]);
  useEffect(() => { if (loaded) saveData(STORAGE_KEYS.customFoods,      customFoods);      }, [customFoods,      loaded]);
  useEffect(() => {
    if (!loaded) return;
    saveData(STORAGE_KEYS.profile, profile);
    // Recompute base goals whenever profile fields change
    setGoals(computeGoals(profile));
  }, [profile, loaded]);
  useEffect(() => { if (loaded) saveData(STORAGE_KEYS.exRatio,          exRatio);          }, [exRatio,          loaded]);
  useEffect(() => { if (loaded) saveData(STORAGE_KEYS.recipes,          recipes);          }, [recipes,          loaded]);
  useEffect(() => { if (loaded) saveData(STORAGE_KEYS.syncQueue,        syncQueue);        }, [syncQueue,        loaded]);
  useEffect(() => { if (loaded) saveData(STORAGE_KEYS.supplementStacks, supplementStacks); }, [supplementStacks, loaded]);
  useEffect(() => { if (loaded && lastExportedAt !== null) saveData(STORAGE_KEYS.lastExportedAt, lastExportedAt); }, [lastExportedAt, loaded]);

  // allFoodsForRender: includes soft-deleted custom foods so historical log entries still resolve
  // SPIKE 5.9: swap in USDA_SPIKE_DB when flag is on
  const _baseDB = SPIKE_59_ENABLED ? USDA_SPIKE_DB : FOOD_DB;
  const allFoodsForRender = [..._baseDB, ...customFoods];
  // allFoods: excludes soft-deleted custom foods — used for search, recipe creation, matching
  const allFoods = [..._baseDB, ...customFoods.filter(f => !f.deleted)];
  const dayLog   = logs[currentDate] || [];

  // ── DAILY TOTALS ─────────────────────────────────────────────────────
  const dailyTotals = useCallback(() => {
    const t = {}; Object.keys(NUTRIENT_META).forEach(k => t[k] = 0);
    dayLog.forEach(e => {
      if (e.type === "exercise") return;
      if (e.type === "supplement") {
        (e.items || []).forEach(item => {
          Object.keys(item.nutrients || {}).forEach(k => { if (NUTRIENT_META[k]) t[k] += (item.nutrients[k] || 0); });
        });
        return;
      }
      if (e.type === "recipe") {
        (e.derivedIngredients || []).forEach(ing => {
          const m = ing.amount_g / 100;
          if (ing.snapshot) { Object.keys(NUTRIENT_META).forEach(k => { t[k] += (ing.snapshot[k] || 0) * m; }); }
          else { const food = allFoodsForRender.find(f => f.id === ing.foodId); if (!food) return; Object.keys(NUTRIENT_META).forEach(k => { t[k] += (food[k] || 0) * m; }); }
        });
        return;
      }
      const m = e.amount / 100;
      if (e.snapshot) { Object.keys(NUTRIENT_META).forEach(k => { t[k] += (e.snapshot[k] || 0) * m; }); }
      else { const food = allFoodsForRender.find(f => f.id === e.foodId); if (!food) return; Object.keys(NUTRIENT_META).forEach(k => { t[k] += (food[k] || 0) * m; }); }
    });
    return t;
  }, [dayLog, allFoodsForRender]);

  const totals = dailyTotals();
  const exerciseBurn = dayLog.filter(e => e.type === "exercise").reduce((s,e) => s + (e.calories_burned||0), 0);
  const ratioSum = (exRatio.carb + exRatio.fat + exRatio.pro) || 100;

  // Merge: computed goals < stored goals < manual overrides
  const resolvedGoals = { ...goals, ...goalOverrides };

  // Dynamic protein multiplier: scales 1.0× (no exercise) → 2.0× (burn ≈ TDEE)
  // Clamped to [1.0, 2.0]. Formula: 1 + (burn / TDEE).
  const tdeeBase = resolvedGoals.cal || 2000;
  const proMultiplier = Math.min(2.0, 1.0 + exerciseBurn / tdeeBase);
  const proBase = goals.pro || 70; // computed base before overrides so multiplier applies to formula value

  const effectiveGoals = exerciseBurn > 0 ? { ...resolvedGoals,
    cal:  resolvedGoals.cal  + exerciseBurn,
    carb: resolvedGoals.carb + Math.round(exerciseBurn * (exRatio.carb / ratioSum) / 4),
    fat:  resolvedGoals.fat  + Math.round(exerciseBurn * (exRatio.fat  / ratioSum) / 9),
    pro:  goalOverrides.pro != null
            ? resolvedGoals.pro  // user has manually set protein — don't scale
            : Math.round(proBase * proMultiplier),
  } : resolvedGoals;
  const pct = k => Math.round((totals[k] / (effectiveGoals[k] || 1)) * 100);
  const handleMacroTap = k => { if (k==="cal") setView("calDetail"); if (k==="fib") setView("fibDetail"); if (k==="fat") setView("fatDetail"); if (k==="pro") setView("proDetail"); };

  // ── FOOD ACTIONS ──────────────────────────────────────────────────────
  const addEntry = () => {
    if (!selectedFood || !amount) return;
    if (editingEntryId) {
      setLogs(prev => ({ ...prev, [currentDate]: (prev[currentDate]||[]).map(e => e.id === editingEntryId ? { ...e, foodId:selectedFood.id, foodName:selectedFood.name, amount:parseFloat(amount), meal } : e) }));
      setEditingEntryId(null);
    } else {
      setLogs(prev => ({ ...prev, [currentDate]: [...(prev[currentDate]||[]), { id:Date.now().toString(), foodId:selectedFood.id, foodName:selectedFood.name, amount:parseFloat(amount), meal, time:new Date().toISOString(), snapshot:buildFoodSnapshot(selectedFood) }] }));
    }
    setSelectedFood(null); setAmount("100"); setSearchTerm(""); setView("log");
  };
  const removeEntry    = id => setLogs(prev => ({ ...prev, [currentDate]: (prev[currentDate]||[]).filter(e => e.id !== id) }));
  const startEditEntry = entry => { const food = allFoods.find(f => f.id === entry.foodId); if (!food) return; setSelectedFood(food); setAmount(String(entry.amount)); setMeal(entry.meal); setEditingEntryId(entry.id); setAddMode("food"); setView("add"); };

  // ── EXERCISE ──────────────────────────────────────────────────────────
  const addExercise = burnOverride => {
    const act = EXERCISE_ACTIVITIES.find(a => a.id === exActivity);
    const wt = parseFloat(profile.weightKg) || 70, dur = parseFloat(exDuration) || 0;
    const auto = Math.round(act.met * wt * (dur / 60));
    const burn = burnOverride !== undefined ? burnOverride : auto;
    setLogs(prev => ({ ...prev, [currentDate]: [...(prev[currentDate]||[]), { id:Date.now().toString(), type:"exercise", activity:act.label+" - "+act.intensity, duration_min:dur, calories_burned:burn, time:new Date().toISOString() }] }));
    setExActivity(EXERCISE_ACTIVITIES[0].id); setExDuration("60"); setExBurnEdit(""); setView("log");
  };

  // ── RECIPE ACTIONS ────────────────────────────────────────────────────
  const startNewRecipe  = () => { setRecipeInProgress({ name:"", source:"", servings:"4", ingredients:[] }); setEditingRecipeId(null); setView("recipeCreate"); };
  const startEditRecipe = r   => { setRecipeInProgress({ name:r.name, source:r.source||"", servings:String(r.servings), ingredients:[...r.ingredients] }); setEditingRecipeId(r.id); setView("recipeCreate"); };
  const saveRecipe = () => {
    if (!recipeInProgress.name.trim() || !recipeInProgress.ingredients.length) return;
    const s = parseFloat(recipeInProgress.servings) || 1, n = calcRecipeNutritionPerServing(recipeInProgress.ingredients, s, allFoods);
    const rec = { name:recipeInProgress.name.trim(), source:recipeInProgress.source.trim(), servings:s, ingredients:recipeInProgress.ingredients, nutrition_per_serving:n };
    if (editingRecipeId) setRecipes(prev => prev.map(r => r.id === editingRecipeId ? { ...r, ...rec } : r));
    else setRecipes(prev => [...prev, { id:`recipe_${Date.now()}`, ...rec }]);
    setEditingRecipeId(null); setView("recipes");
  };
  const deleteRecipe = id => { setRecipes(prev => prev.filter(r => r.id !== id)); setView("recipes"); };
  const addIngredientToRecipe = () => { if (!recipeIngSelected || !recipeIngAmount) return; setRecipeInProgress(prev => ({ ...prev, ingredients:[...prev.ingredients, { foodId:recipeIngSelected.id, foodName:recipeIngSelected.name, amount_g:parseFloat(recipeIngAmount)||100 }] })); setRecipeIngSelected(null); setRecipeIngSearch(""); setRecipeIngAmount("100"); setView("recipeCreate"); };
  const removeIngFromRecipe = idx => setRecipeInProgress(prev => ({ ...prev, ingredients:prev.ingredients.filter((_,i) => i !== idx) }));
  const logRecipe = () => {
    if (!selectedRecipe) return;
    const rs = Math.max(Number(selectedRecipe.servings)||1,0.01), tw = selectedRecipe.ingredients.reduce((s,i)=>s+i.amount_g,0);
    let frac, sl;
    if (recipeLogMode==="servings") { sl=parseFloat(recipeLogServings)||1; frac=sl/rs; }
    else { const g=parseFloat(recipeLogGrams)||0; frac=tw>0?g/tw:0; sl=Math.round(frac*rs*10)/10; }
    const di = selectedRecipe.ingredients.map(ing => { const food = allFoods.find(f => f.id === ing.foodId); return { foodId:ing.foodId, foodName:ing.foodName, amount_g:Math.round(ing.amount_g*frac*10)/10, ...(food ? { snapshot:buildFoodSnapshot(food) } : {}) }; });
    setLogs(prev => ({ ...prev, [currentDate]: [...(prev[currentDate]||[]), { id:Date.now().toString(), type:"recipe", recipeId:selectedRecipe.id, recipeName:selectedRecipe.name, servings:Math.round(sl*10)/10, meal:recipeLogMeal, time:new Date().toISOString(), derivedIngredients:di }] }));
    setView("log"); setRecipeLogServings("1"); setRecipeLogGrams(""); setRecipeLogMode("servings"); setSelectedRecipe(null); setRecipeLogReturn("recipeDetail");
  };

  // ── SUPPLEMENT ACTIONS ────────────────────────────────────────────────
  const openStackEditor = stack => {
    if (stack) { setEditingStackId(stack.id); setStackEditorName(stack.name); setStackEditorItems(stack.items.map(i => ({ ...i, nutrients:{...i.nutrients} }))); }
    else { setEditingStackId(null); setStackEditorName(""); setStackEditorItems([]); }
    setView("stackEditor");
  };
  const saveStack = () => {
    if (!stackEditorName.trim()) return;
    const stack = { id:editingStackId||`stack_${Date.now()}`, name:stackEditorName.trim(), items:stackEditorItems };
    if (editingStackId) setSupplementStacks(prev => prev.map(s => s.id===editingStackId ? stack : s));
    else setSupplementStacks(prev => [...prev, stack]);
    setView("settings");
  };
  const deleteStack = id => { setSupplementStacks(prev => prev.filter(s => s.id !== id)); setView("settings"); };

  const openItemEditor = idx => {
    if (idx !== null && idx !== undefined) { const item = stackEditorItems[idx]; setEditingItemIdx(idx); setItemEditorData({ name:item.name, dose_amount:String(item.dose_amount), dose_unit:item.dose_unit, nutrients:{...item.nutrients} }); }
    else { setEditingItemIdx(null); setItemEditorData({ name:"", dose_amount:"", dose_unit:"mcg", nutrients:{} }); }
    setItemNutKey("b12"); setItemNutVal(""); setView("itemEditor");
  };
  const saveItem = () => {
    const item = { name:itemEditorData.name.trim(), dose_amount:parseFloat(itemEditorData.dose_amount)||0, dose_unit:itemEditorData.dose_unit, nutrients:{...itemEditorData.nutrients} };
    if (!item.name) return;
    if (editingItemIdx !== null && editingItemIdx !== undefined) setStackEditorItems(prev => prev.map((x,i) => i===editingItemIdx ? item : x));
    else setStackEditorItems(prev => [...prev, item]);
    setView("stackEditor");
  };
  const removeItemFromStack  = idx => setStackEditorItems(prev => prev.filter((_,i) => i !== idx));
  const addNutrientToItem    = () => { const val = parseFloat(itemNutVal); if (!itemNutKey || isNaN(val)) return; setItemEditorData(prev => ({ ...prev, nutrients:{...prev.nutrients,[itemNutKey]:val} })); setItemNutVal(""); };
  const removeNutrientFromItem = key => { setItemEditorData(prev => { const n={...prev.nutrients}; delete n[key]; return {...prev,nutrients:n}; }); };

  const openSuppLogConfirm = stack => { setSuppLogStack(stack); setSuppLogItems(stack.items.map(item => ({ ...item, checked:true, doseOverride:"" }))); setView("suppLogConfirm"); };
  const logSuppStack = () => {
    if (!suppLogStack) return;
    const items = suppLogItems.filter(i => i.checked).map(i => { const d = parseFloat(i.doseOverride); return { name:i.name, dose_amount:(!isNaN(d)&&i.doseOverride.trim()!="")?d:i.dose_amount, dose_unit:i.dose_unit, nutrients:{...i.nutrients} }; });
    if (!items.length) { setView("add"); return; }
    const suppSnapshot = {}; items.forEach(item => { Object.keys(item.nutrients || {}).forEach(k => { suppSnapshot[k] = (suppSnapshot[k] || 0) + (item.nutrients[k] || 0); }); });
    setLogs(prev => ({ ...prev, [currentDate]: [...(prev[currentDate]||[]), { id:Date.now().toString(), type:"supplement", stackId:suppLogStack.id, stackName:suppLogStack.name, items, time:new Date().toISOString(), meal:"", snapshot:suppSnapshot }] }));
    setSuppLogStack(null); setSuppLogItems([]); setView("log");
  };

  const addNutrientToOneOff    = () => { const val = parseFloat(oneOffNutVal); if (!oneOffNutKey || isNaN(val)) return; setOneOffData(prev => ({ ...prev, nutrients:{...prev.nutrients,[oneOffNutKey]:val} })); setOneOffNutVal(""); };
  const removeNutrientFromOneOff = key => { setOneOffData(prev => { const n={...prev.nutrients}; delete n[key]; return {...prev,nutrients:n}; }); };
  const logOneOff = () => {
    if (!oneOffData.name.trim()) return;
    const item = { name:oneOffData.name.trim(), dose_amount:parseFloat(oneOffData.dose_amount)||0, dose_unit:oneOffData.dose_unit, nutrients:{...oneOffData.nutrients} };
    setLogs(prev => ({ ...prev, [currentDate]: [...(prev[currentDate]||[]), { id:Date.now().toString(), type:"supplement", stackId:null, stackName:"One-off", items:[item], time:new Date().toISOString(), meal:"", snapshot:{...item.nutrients} }] }));
    setOneOffData({ name:"", dose_amount:"", dose_unit:"mcg", nutrients:{} }); setOneOffNutKey("b12"); setOneOffNutVal(""); setView("log");
  };

  const changeDate = delta => { const d = new Date(currentDate); d.setDate(d.getDate()+delta); setCurrentDate(dateKey(d)); };

  const saveCustomFood = () => {
    if (!cf.name.trim() || !cf.cal) return;
    const newFood = { id:`custom_${Date.now()}`, name:cf.name.trim(), cat:cf.cat||"Other", ...Object.fromEntries(Object.keys(NUTRIENT_META).map(k => [k, parseFloat(cf[k])||0])) };
    setCustomFoods(prev => [...prev, newFood]);
    setCf({ name:"", cat:"Other", cal:"", pro:"", carb:"", fat:"", fib:"", iron:"", calc:"", zinc:"", b12:"", vitD:"", omega3:"", iod:"", sel:"", mag:"", pot:"", fol:"" });
    setView("add");
  };

  const softDeleteCustomFood = id => setCustomFoods(prev => prev.map(f => f.id === id ? { ...f, deleted: true } : f));
  const restoreCustomFood    = id => setCustomFoods(prev => prev.map(f => f.id === id ? { ...f, deleted: false } : f));

  // Open edit views for logged entries
  const openEditRecipeEntry = entry => {
    setEditingLogEntry(entry);
    setEditLogServings(String(entry.servings));
    setEditLogMeal(entry.meal || "Breakfast");
    setView("editLoggedRecipe");
  };
  const openEditExerciseEntry = entry => {
    setEditingLogEntry(entry);
    setEditLogDuration(String(entry.duration_min));
    setEditLogBurn(String(entry.calories_burned));
    setView("editLoggedExercise");
  };
  const openEditSuppEntry = entry => {
    setEditingLogEntry(entry);
    setEditLogSuppItems((entry.items || []).map(i => ({ ...i, doseOverride: "" })));
    setView("editLoggedSupp");
  };

  // Save edits back to log
  const saveEditedRecipeEntry = () => {
    if (!editingLogEntry) return;
    const recipe = recipes.find(r => r.id === editingLogEntry.recipeId);
    const servings = parseFloat(editLogServings) || 1;
    let di = editingLogEntry.derivedIngredients;
    // Recompute derivedIngredients if recipe still exists and servings changed
    if (recipe) {
      const rs = Math.max(Number(recipe.servings) || 1, 0.01);
      const frac = servings / rs;
      di = recipe.ingredients.map(ing => { const origIng = (editingLogEntry.derivedIngredients || []).find(d => d.foodId === ing.foodId); return { foodId: ing.foodId, foodName: ing.foodName, amount_g: Math.round(ing.amount_g * frac * 10) / 10, ...(origIng?.snapshot ? { snapshot: origIng.snapshot } : {}) }; });
    }
    setLogs(prev => ({ ...prev, [currentDate]: (prev[currentDate] || []).map(e =>
      e.id === editingLogEntry.id ? { ...e, servings: Math.round(servings * 10) / 10, meal: editLogMeal, derivedIngredients: di } : e
    )}));
    setEditingLogEntry(null); setView("log");
  };
  const saveEditedExerciseEntry = () => {
    if (!editingLogEntry) return;
    const dur = parseFloat(editLogDuration) || 0;
    let burn;
    if (editLogBurn !== "") {
      // Manual override
      burn = parseInt(editLogBurn) || 0;
    } else {
      // Try to find the original activity's MET for precise recalc
      const act = EXERCISE_ACTIVITIES.find(a => (a.label + " - " + a.intensity) === editingLogEntry.activity);
      if (act) {
        const wt = parseFloat(profile?.weightKg) || 70;
        burn = Math.round(act.met * wt * (dur / 60));
      } else {
        // Fallback: pro-rata scale from original values
        const origDur = editingLogEntry.duration_min || dur;
        burn = origDur > 0 ? Math.round((editingLogEntry.calories_burned / origDur) * dur) : 0;
      }
    }
    setLogs(prev => ({ ...prev, [currentDate]: (prev[currentDate] || []).map(e =>
      e.id === editingLogEntry.id ? { ...e, duration_min: dur, calories_burned: burn } : e
    )}));
    setEditingLogEntry(null); setView("log");
  };
  const saveEditedSuppEntry = () => {
    if (!editingLogEntry) return;
    const items = editLogSuppItems.map(i => {
      const newDose = parseFloat(i.doseOverride);
      const hasOverride = !isNaN(newDose) && i.doseOverride.trim() !== "";
      const finalDose = hasOverride ? newDose : i.dose_amount;
      // Rescale nutrients proportionally to dose change
      const scaleFactor = (i.dose_amount > 0 && hasOverride) ? (newDose / i.dose_amount) : 1;
      const nutrients = Object.fromEntries(
        Object.entries(i.nutrients || {}).map(([k, v]) => [k, Math.round(v * scaleFactor * 1000) / 1000])
      );
      return { name: i.name, dose_amount: finalDose, dose_unit: i.dose_unit, nutrients };
    });
    setLogs(prev => ({ ...prev, [currentDate]: (prev[currentDate] || []).map(e =>
      e.id === editingLogEntry.id ? { ...e, items } : e
    )}));
    setEditingLogEntry(null); setView("log");
  };
  // ── NOTION SYNC ───────────────────────────────────────────────────────
  const buildReviewData = parsedRecipes => {
    const review = parsedRecipes.map(r => {
      const existing = recipes.find(rec => rec.name.toLowerCase().trim() === (r.title||"").toLowerCase().trim());
      return { title:r.title||"Untitled", servings:r.servings||4, source:r.source||"",
        ingredients:(r.ingredients||[]).map(ing => { const match = fuzzyMatchFood(ing.name, allFoods); return { raw:`${ing.amount} ${ing.unit} ${ing.name}`, name:ing.name, amount:ing.amount, unit:ing.unit, amount_g:toGrams(ing.amount,ing.unit), match, skipped:!match }; }),
        duplicateAction: existing ? null : "import", existingId: existing?.id||null, imported: false };
    });
    setSyncReviewData(review); setNotionSyncMsg(null); setSyncInProgress(false); setView("notionReview");
  };

  const handleTestConnection = async () => {
    setNotionSyncMsg({ type:"info", text:"Testing connection…" });
    try { const data = await fetchHealth(); setNotionSyncMsg({ type:"info", text:`✓ Connected to Worker (v${data.version||"?"})` }); setTimeout(() => setNotionSyncMsg(null), 4000); }
    catch (err) { const msg = err.message||""; let f = msg.includes("worker_403")?"Worker rejected. Check ALLOWED_ORIGINS.":msg.startsWith("network:")?"Could not reach Worker. Are you online?": `Connection failed: ${msg}`; setNotionSyncMsg({ type:"error", text:f }); setTimeout(() => setNotionSyncMsg(null), 8000); }
  };

  const handleResetSyncHistory = () => { setLastSyncedAt(null); saveData(STORAGE_KEYS.notionStatus,{lastSyncedAt:null}); setNotionSyncMsg({type:"info",text:"Sync history cleared."}); setTimeout(()=>setNotionSyncMsg(null),4000); };

  const handleWorkerSync = async () => {
    if (!navigator.onLine) { setSyncQueue(prev=>[...prev,{id:Date.now().toString(),captured_time:new Date().toISOString(),status:"pending"}]); setNotionSyncMsg({type:"info",text:"Offline. Sync queued."}); setTimeout(()=>setNotionSyncMsg(null),4000); return; }
    setSyncInProgress(true); setSyncProgress({phase:"connecting",current:0,total:0}); setNotionSyncMsg(null);
    try {
      setSyncProgress({phase:"listing",current:0,total:0});
      const lr = await fetchRecipesList(lastSyncedAt); const rl = lr.recipes||[], fa = lr.fetched_at||new Date().toISOString();
      if (!rl.length) { setLastSyncedAt(fa); saveData(STORAGE_KEYS.notionStatus,{lastSyncedAt:fa}); setSyncInProgress(false); setSyncProgress(null); setNotionSyncMsg({type:"info",text:lastSyncedAt?"No new recipes since last sync.":"No recipes found."}); setTimeout(()=>setNotionSyncMsg(null),5000); return; }
      setSyncProgress({phase:"fetching",current:0,total:rl.length});
      const enriched = await fetchRecipePagesWithProgress(rl, c => setSyncProgress({phase:"fetching",current:c,total:rl.length}));
      const usable = enriched.filter(r=>r.ingredientLines&&r.ingredientLines.length), skipped = enriched.length-usable.length;
      if (!usable.length) { setSyncInProgress(false); setSyncProgress(null); setNotionSyncMsg({type:"error",text:"No parseable ingredient tables found."}); setTimeout(()=>setNotionSyncMsg(null),6000); return; }
      setSyncProgress({phase:"parsing",current:0,total:usable.length});
      const parsed = [];
      for (let i=0; i<usable.length; i++) { const r=usable[i]; try { const ing=await parseIngredients(r.ingredientLines); parsed.push({...r,ingredients:ing}); } catch { parsed.push({...r,ingredients:[]}); } setSyncProgress({phase:"parsing",current:i+1,total:usable.length}); }
      buildReviewData(parsed); setLastSyncedAt(fa); saveData(STORAGE_KEYS.notionStatus,{lastSyncedAt:fa});
      if (skipped>0) setNotionSyncMsg({type:"info",text:`${parsed.length} recipe${parsed.length===1?"":"s"} for review. ${skipped} skipped.`});
      setSyncProgress(null);
    } catch (err) {
      const msg=err.message||""; let f=msg.includes("worker_403")?"Worker rejected. Check ALLOWED_ORIGINS.":msg.includes("worker_502")?"Notion unreachable.":msg.startsWith("network:")?"Lost connection.":`Sync failed: ${msg}`;
      setNotionSyncMsg({type:"error",text:f}); setSyncInProgress(false); setSyncProgress(null); setTimeout(()=>setNotionSyncMsg(null),8000);
    }
  };

  const handlePasteSync = async () => {
    if (!pasteText.trim()) return; setSyncInProgress(true); setNotionSyncMsg({type:"info",text:"Parsing pasted content…"});
    try { const rr=await parseRecipesFromPasteText(pasteText); if(!rr.length){setNotionSyncMsg({type:"error",text:"No recipes found."});setSyncInProgress(false);setTimeout(()=>setNotionSyncMsg(null),5000);return;} const parsed=await Promise.all(rr.map(async r=>({...r,ingredients:await parseIngredients(r.ingredientLines)}))); buildReviewData(parsed); }
    catch { setNotionSyncMsg({type:"error",text:"Parsing failed."}); setSyncInProgress(false); setTimeout(()=>setNotionSyncMsg(null),4000); }
  };

  const handleParserTest = async () => {
    if (!parserTestText.trim()) return; setSyncInProgress(true);
    try { const lines=parserTestText.split(/\r?\n/).map(l=>l.trim()).filter(Boolean); const ing=await parseIngredients(lines); buildReviewData([{title:"Parser Test",servings:1,source:"regex parser test",ingredientLines:lines,ingredients:ing}]); }
    catch (err) { setNotionSyncMsg({type:"error",text:`Parser failed: ${err.message||"unknown"}`}); setSyncInProgress(false); }
  };

  const importRecipe = idx => {
    const r = syncReviewData[idx]; if (r.duplicateAction==="skip"||r.imported) return;
    const ingredients = r.ingredients.filter(i=>i.match&&!i.skipped).map(i=>({foodId:i.match.id,foodName:i.match.name,amount_g:i.amount_g}));
    if (!ingredients.length) return;
    const s=Math.max(r.servings||1,0.1), nutrition=calcRecipeNutritionPerServing(ingredients,s,allFoods);
    const name = r.duplicateAction==="copy"?`${r.title} (imported)`:r.title;
    const newRec = {id:(r.duplicateAction==="overwrite"&&r.existingId)?r.existingId:`recipe_${Date.now()}_${idx}`,name,source:r.source,servings:s,ingredients,nutrition_per_serving:nutrition};
    if (r.duplicateAction==="overwrite"&&r.existingId) setRecipes(prev=>prev.map(rec=>rec.id===r.existingId?newRec:rec));
    else setRecipes(prev=>[...prev,newRec]);
    setSyncReviewData(prev=>prev.map((item,i)=>i===idx?{...item,imported:true}:item));
  };

  const importAllReady = () => { syncReviewData.forEach((_,idx)=>{const r=syncReviewData[idx];if(!r.imported&&r.duplicateAction!==null&&r.duplicateAction!=="skip")importRecipe(idx);}); setSyncQueue([]); setPasteText(""); setView("settings"); setNotionSyncMsg({type:"info",text:"Import complete ✓"}); setTimeout(()=>setNotionSyncMsg(null),3000); };
  const clearSyncQueue = () => { setSyncQueue([]); setNotionSyncMsg({type:"info",text:"Queue cleared."}); setTimeout(()=>setNotionSyncMsg(null),3000); };

  const filteredFoods = searchTerm.length>0 ? allFoods.filter(f=>f.name.toLowerCase().includes(searchTerm.toLowerCase())) : allFoods;
  const groupedByCategory = filteredFoods.reduce((acc,f)=>{if(!acc[f.cat])acc[f.cat]=[];acc[f.cat].push(f);return acc;},{});
  const filteredIngFoods = recipeIngSearch.length>0 ? allFoods.filter(f=>f.name.toLowerCase().includes(recipeIngSearch.toLowerCase())) : allFoods;
  const groupedIngByCategory = filteredIngFoods.reduce((acc,f)=>{if(!acc[f.cat])acc[f.cat]=[];acc[f.cat].push(f);return acc;},{});
  const formatDate = ds => { const d=new Date(ds+"T12:00:00"); return d.toLocaleDateString("en-GB",{weekday:"short",month:"short",day:"numeric"}); };

  if (!loaded) return (
    <div style={{background:"#0a0f1a",color:"#e2e8f0",height:"100vh",display:"flex",alignItems:"center",justifyContent:"center"}}>
      <div style={{textAlign:"center"}}><div style={{fontSize:28,fontWeight:700,letterSpacing:"-0.02em"}}>NutriTrack</div><div style={{fontSize:13,color:"#64748b",marginTop:6}}>Loading…</div></div>
    </div>
  );
  // ── STYLES ────────────────────────────────────────────────────────────
  const S = {
    app:       { background:"#0a0f1a", color:"#e2e8f0", minHeight:"100vh", fontFamily:"'DM Sans', system-ui, sans-serif", paddingBottom:80 },
    header:    { padding:"16px 20px 8px", display:"flex", alignItems:"center", justifyContent:"space-between" },
    section:   { padding:"0 20px" },
    card:      { background:"#111827", borderRadius:14, padding:16, marginBottom:10, border:"1px solid #1e293b" },
    macroGrid: { display:"grid", gridTemplateColumns:"repeat(5, 1fr)", gap:6, padding:"12px 20px" },
    macroItem: { display:"flex", flexDirection:"column", alignItems:"center", gap:4, cursor:"pointer" },
    macroLabel:{ fontSize:10, color:"#94a3b8", fontWeight:500 },
    macroVal:  { fontSize:11, fontWeight:700, color:"#e2e8f0" },
    mealHdr:   { fontSize:13, fontWeight:700, color:"#94a3b8", textTransform:"uppercase", letterSpacing:"0.05em" },
    entry:     { display:"flex", justifyContent:"space-between", alignItems:"center", padding:"10px 12px", borderBottom:"1px solid #1e293b" },
    entryName: { fontSize:14, fontWeight:500, color:"#e2e8f0" },
    entryDet:  { fontSize:12, color:"#64748b" },
    entryCal:  { fontSize:13, fontWeight:600, color:"#f59e0b" },
    delBtn:    { background:"none", border:"none", color:"#ef4444", fontSize:16, cursor:"pointer", padding:"4px 8px" },
    fab:       { position:"fixed", bottom:"calc(88px + env(safe-area-inset-bottom, 0px))", right:"calc(20px + env(safe-area-inset-right, 0px))", width:52, height:52, borderRadius:16, background:"#3b82f6", border:"none", color:"#fff", fontSize:28, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"0 4px 20px rgba(59,130,246,0.4)", zIndex:100 },
    nav:       { position:"fixed", bottom:0, left:0, right:0, background:"#111827", borderTop:"1px solid #1e293b", display:"flex", justifyContent:"space-around", padding:"8px 0", paddingBottom:"calc(8px + env(safe-area-inset-bottom, 0px))", zIndex:100 },
    navBtn:  a => ({ background:"none", border:"none", color:a?"#3b82f6":"#64748b", fontSize:11, fontWeight:600, cursor:"pointer", display:"flex", flexDirection:"column", alignItems:"center", gap:2, padding:"4px 10px" }),
    input:     { width:"100%", background:"#1e293b", border:"1px solid #334155", borderRadius:10, padding:"12px 14px", color:"#e2e8f0", fontSize:15, outline:"none", boxSizing:"border-box" },
    srchItem:  { padding:"12px 0", borderBottom:"1px solid #1e293b", cursor:"pointer" },
    pill:    a => ({ padding:"6px 14px", borderRadius:20, border:a?"1px solid #3b82f6":"1px solid #334155", background:a?"#1d4ed8":"transparent", color:a?"#fff":"#94a3b8", fontSize:13, cursor:"pointer" }),
    microRow:  { display:"flex", justifyContent:"space-between", alignItems:"center", padding:"6px 0", cursor:"pointer" },
    microBar:  { height:4, borderRadius:2, background:"#1e293b", flex:1, margin:"0 8px", position:"relative", overflow:"hidden" },
    label:     { fontSize:12, color:"#94a3b8", fontWeight:600, display:"block", marginBottom:6 },
    cfRow:     { display:"flex", alignItems:"center", justifyContent:"space-between", padding:"8px 0", borderBottom:"1px solid #1e293b" },
    modePicker:{ display:"flex", background:"#0a0f1a", borderRadius:10, padding:4, marginBottom:16 },
    modeTab: a => ({ flex:1, padding:"8px 0", borderRadius:8, border:"none", cursor:"pointer", fontSize:13, fontWeight:600, background:a?"#1d4ed8":"transparent", color:a?"#fff":"#64748b" }),
    suppRow:   { display:"flex", justifyContent:"space-between", alignItems:"center", padding:"10px 0", borderBottom:"1px solid #1e293b" },
  };

  const RECIPE_VIEWS = ["recipes","recipeCreate","recipeIngAdd","recipeDetail","recipeLog"];
  const BottomNav = () => (
    <div style={S.nav}>
      <button style={S.navBtn(view==="log")}                   onClick={() => setView("log")}>     <span style={{fontSize:18}}>📋</span>Log     </button>
      <button style={S.navBtn(view==="goals")}                 onClick={() => setView("goals")}>   <span style={{fontSize:18}}>🎯</span>Goals   </button>
      <button style={S.navBtn(RECIPE_VIEWS.includes(view))}    onClick={() => setView("recipes")}> <span style={{fontSize:18}}>📖</span>Recipes </button>
      <button style={S.navBtn(view==="settings")}              onClick={() => setView("settings")}><span style={{fontSize:18}}>⚙️</span>Settings</button>
    </div>
  );

  // Helper: supplement contribution to one nutrient key for detail views
  const suppContrib = (entry, k) => (entry.items||[]).reduce((s,item) => s + ((item.nutrients||{})[k]||0), 0);
  const recipeSubtotal = (e, field) => (e.derivedIngredients||[]).reduce((s,ing) => { if (ing.snapshot && ing.snapshot[field] !== undefined) return s + (ing.snapshot[field]||0) * ing.amount_g / 100; const f=allFoodsForRender.find(x=>x.id===ing.foodId); return s+(f?(f[field]||0)*ing.amount_g/100:0); }, 0);
  // ── LOG VIEW ──────────────────────────────────────────────────────────
  if (view === "log") {
    const grouped = {}; MEALS.forEach(m => grouped[m] = []);
    dayLog.forEach(e => { if (e.type==="exercise"||e.type==="supplement") return; if (!grouped[e.meal]) grouped[e.meal]=[]; grouped[e.meal].push(e); });
    const suppEntries = dayLog.filter(e => e.type === "supplement");
    return (
      <div style={S.app}>
        {SPIKE_59_ENABLED && <div style={{background:"#b45309",color:"#fff",fontSize:11,fontWeight:700,textAlign:"center",padding:"4px 0",letterSpacing:"0.05em"}}>⚠ SPIKE 5.9 ACTIVE — {allFoods.length} foods (USDA)</div>}
        <div style={S.header}>
          <div style={{display:"flex",alignItems:"center",gap:12}}>
            <button style={{background:"none",border:"none",color:"#94a3b8",fontSize:20,padding:"4px 8px",cursor:"pointer"}} onClick={() => changeDate(-1)}>‹</button>
            <span style={{fontSize:15,fontWeight:600,color:"#e2e8f0",letterSpacing:"-0.01em"}}>{formatDate(currentDate)}{currentDate===today()&&<span style={{fontSize:10,color:"#3b82f6",fontWeight:600,marginLeft:6}}>TODAY</span>}</span>
            <button style={{background:"none",border:"none",color:"#94a3b8",fontSize:20,padding:"4px 8px",cursor:"pointer"}} onClick={() => changeDate(1)}>›</button>
          </div>
        </div>
        <div style={S.macroGrid}>
          {MACROS.map(k => (
            <div key={k} style={S.macroItem} onClick={() => handleMacroTap(k)}>
              <Ring value={totals[k]} max={effectiveGoals[k]} color={NUTRIENT_META[k].color} size={48} stroke={4}>
                <text x="50%" y="50%" textAnchor="middle" dy="0.35em" fill={NUTRIENT_META[k].color} fontSize={10} fontWeight={700}>{pct(k)}%</text>
              </Ring>
              <div style={S.macroLabel}>{NUTRIENT_META[k].label}</div>
              <div style={S.macroVal}>{Math.round(totals[k])}<span style={{fontSize:9,color:"#64748b"}}>{NUTRIENT_META[k].unit}</span></div>
            </div>
          ))}
        </div>
        {exerciseBurn > 0 && (
          <div style={{margin:"0 20px 8px",background:"#0f2d1a",border:"1px solid #16a34a",borderRadius:10,padding:"8px 14px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
            <span style={{fontSize:13,color:"#4ade80"}}>🏃 {exerciseBurn} kcal burned today</span>
            <span style={{fontSize:11,color:"#166534"}}>goals adjusted</span>
          </div>
        )}
        <div style={S.section}>
          <div style={S.card}>
            <div style={{fontSize:13,fontWeight:700,color:"#94a3b8",marginBottom:8,letterSpacing:"0.05em",textTransform:"uppercase"}}>Micronutrients</div>
            {MICROS.map(k => { const p=pct(k), meta=NUTRIENT_META[k]; return (
              <div key={k} style={S.microRow} onClick={() => { setDetailNutrient(k); setView("detail"); }}>
                <span style={{fontSize:12,color:"#e2e8f0",width:80,fontWeight:500}}>{meta.label}</span>
                <div style={S.microBar}><div style={{position:"absolute",left:0,top:0,height:"100%",width:`${Math.min(p,100)}%`,background:meta.color,borderRadius:2,transition:"width 0.5s ease"}}/></div>
                <span style={{fontSize:11,color:p>=100?"#10b981":p>=60?"#f59e0b":"#ef4444",width:32,textAlign:"right"}}>{p}%</span>
              </div>
            ); })}
          </div>
        </div>
        <div style={{...S.section,paddingBottom:240}}>
          {MEALS.map(m => {
            const entries = grouped[m]; if (!entries.length) return null;
            const mealCals = entries.reduce((sum,e) => { if(e.type==="recipe") return sum+computeEntryNutrition(e.derivedIngredients||[],allFoodsForRender).cal; if(e.snapshot) return sum+(e.snapshot.cal||0)*e.amount/100; const f=allFoodsForRender.find(x=>x.id===e.foodId); return sum+(f?f.cal*e.amount/100:0); }, 0);
            return (
              <div key={m}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",margin:"12px 0 4px"}}>
                  <div style={S.mealHdr}>{m}</div>
                  <span style={{fontSize:12,color:"#f59e0b",fontWeight:600}}>{Math.round(mealCals)} kcal</span>
                </div>
                {entries.map(e => {
                  if (e.type === "recipe") { const nut=computeEntryNutrition(e.derivedIngredients||[],allFoodsForRender); return (
                    <SwipeableEntry key={e.id} onDelete={() => removeEntry(e.id)}>
                      <div style={S.entry} onClick={() => openEditRecipeEntry(e)}><div style={{flex:1}}><div style={{...S.entryName,color:"#a78bfa"}}>📖 {e.recipeName}</div><div style={S.entryDet}>{e.servings} {e.servings===1?"serving":"servings"} · tap to edit</div></div>
                      <div style={{display:"flex",alignItems:"center"}}><span style={S.entryCal}>{Math.round(nut.cal)} kcal</span><button style={S.delBtn} onClick={ev => { ev.stopPropagation(); removeEntry(e.id); }}>×</button></div></div>
                    </SwipeableEntry>); }
                  const f = allFoodsForRender.find(x => x.id === e.foodId);
                  return (
                    <SwipeableEntry key={e.id} onDelete={() => removeEntry(e.id)}>
                      <div style={S.entry}><div style={{flex:1,cursor:"pointer"}} onClick={() => startEditEntry(e)}><div style={S.entryName}>{e.foodName}</div><div style={S.entryDet}>{e.amount}g · tap to edit</div></div>
                      <div style={{display:"flex",alignItems:"center"}}><span style={S.entryCal}>{e.snapshot?Math.round((e.snapshot.cal||0)*e.amount/100):f?Math.round(f.cal*e.amount/100):"-"} kcal</span><button style={S.delBtn} onClick={() => removeEntry(e.id)}>×</button></div></div>
                    </SwipeableEntry>);
                })}
              </div>
            );
          })}
          {dayLog.filter(e=>e.type!=="exercise"&&e.type!=="supplement").length===0 && !suppEntries.length && (
            <div style={{textAlign:"center",padding:"40px 0",color:"#475569"}}><div style={{fontSize:32,marginBottom:8}}>🥗</div><div style={{fontSize:14}}>No food logged today</div><div style={{fontSize:12,color:"#64748b"}}>Tap + to add your first meal</div></div>
          )}
          {suppEntries.length > 0 && (
            <div>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",margin:"12px 0 4px"}}><div style={S.mealHdr}>Supplements</div></div>
              {suppEntries.map(e => (
                <SwipeableEntry key={e.id} onDelete={() => removeEntry(e.id)}>
                  <div style={{...S.entry,background:"#0f0a1e"}} onClick={() => openEditSuppEntry(e)}>
                    <div style={{flex:1}}><div style={{fontSize:14,fontWeight:500,color:"#c4b5fd"}}>💊 {e.stackName}</div><div style={{fontSize:12,color:"#64748b"}}>{suppItemSummary(e.items)} · tap to edit</div></div>
                    <div style={{display:"flex",alignItems:"center"}}><span style={{fontSize:12,color:"#64748b",marginRight:4}}>{new Date(e.time).toLocaleTimeString("en-GB",{hour:"2-digit",minute:"2-digit"})}</span><button style={S.delBtn} onClick={ev => { ev.stopPropagation(); removeEntry(e.id); }}>×</button></div>
                  </div>
                </SwipeableEntry>
              ))}
            </div>
          )}
          {dayLog.filter(e=>e.type==="exercise").length > 0 && (
            <div>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",margin:"12px 0 4px"}}><div style={S.mealHdr}>Exercise</div><span style={{fontSize:12,color:"#4ade80",fontWeight:600}}>−{exerciseBurn} kcal</span></div>
              {dayLog.filter(e=>e.type==="exercise").map(e => (
                <SwipeableEntry key={e.id} onDelete={() => removeEntry(e.id)}>
                  <div style={{...S.entry,background:"#0a0f1a"}} onClick={() => openEditExerciseEntry(e)}><div style={{flex:1}}><div style={{fontSize:14,fontWeight:500,color:"#4ade80"}}>{e.activity}</div><div style={{fontSize:12,color:"#64748b"}}>{e.duration_min} min · tap to edit</div></div>
                  <div style={{display:"flex",alignItems:"center"}}><span style={{fontSize:13,fontWeight:600,color:"#4ade80"}}>−{e.calories_burned} kcal</span><button style={S.delBtn} onClick={ev => { ev.stopPropagation(); removeEntry(e.id); }}>×</button></div></div>
                </SwipeableEntry>
              ))}
            </div>
          )}
        </div>
        <button style={S.fab} onClick={() => { setEditingEntryId(null); setAddMode("food"); setView("add"); setTimeout(()=>searchRef.current?.focus(),100); }}>+</button>
        <button style={{...S.fab,right:"calc(84px + env(safe-area-inset-right, 0px))",background:"#16a34a",fontSize:22}} onClick={() => setView("exercise")}>🏃</button>
        <BottomNav/>
      </div>
    );
  }
  // ── ADD SCREEN (Food / Recipe / Supplement) ───────────────────────────
  if (view === "add") {
    const ModePicker = () => (
      <div style={S.modePicker}>
        {[["food","🍎 Food"],["recipe","📖 Recipe"],["supplement","💊 Supps"]].map(([m,label]) => (
          <button key={m} style={S.modeTab(addMode===m)} onClick={() => { setAddMode(m); setSelectedFood(null); setSearchTerm(""); }}>{label}</button>
        ))}
      </div>
    );

    if (addMode === "food") {
      return (
        <div style={S.app}>
          <div style={S.header}>
            <button style={{background:"none",border:"none",color:"#94a3b8",fontSize:15,cursor:"pointer"}} onClick={() => { setView("log"); setSelectedFood(null); setSearchTerm(""); setEditingEntryId(null); }}>← Back</button>
            <span style={{fontSize:15,fontWeight:700}}>{selectedFood?(editingEntryId?"Edit Entry":"Log Amount"):"Add Food"}</span>
            {!selectedFood ? <button style={{background:"none",border:"none",color:"#3b82f6",fontSize:13,cursor:"pointer",fontWeight:600}} onClick={() => setView("customAdd")}>+ Custom</button> : <div style={{width:64}}/>}
          </div>
          <div style={S.section}>
            {!selectedFood && <ModePicker/>}
            {!selectedFood ? (
              <>
                <input ref={searchRef} style={S.input} placeholder="Search foods…" value={searchTerm} onChange={e=>setSearchTerm(e.target.value)} autoFocus/>
                {customFoods.length > 0 && (
                  <div style={{textAlign:"right",marginTop:4,marginBottom:2}}>
                    <button style={{background:"none",border:"none",color:"#64748b",fontSize:11,cursor:"pointer",textDecoration:"underline"}} onClick={() => setView("manageCustomFoods")}>Manage custom foods</button>
                  </div>
                )}
                <div style={{marginTop:12,maxHeight:"calc(100vh - 220px)",overflowY:"auto"}}>
                  {(() => {
                    const mr = searchTerm.length>0 ? recipes.filter(r=>r.name.toLowerCase().includes(searchTerm.toLowerCase())) : recipes;
                    if (!mr.length) return null;
                    return (<div><div style={{fontSize:11,fontWeight:700,color:"#475569",padding:"10px 0 4px",letterSpacing:"0.05em",textTransform:"uppercase"}}>Recipes</div>
                      {mr.map(r => { const n=r.nutrition_per_serving||{}; return (
                        <div key={r.id} style={{...S.srchItem,paddingBottom:10}} onClick={() => { setSelectedRecipe(r); setRecipeLogReturn("add"); setRecipeLogServings("1"); setRecipeLogGrams(""); setRecipeLogMode("servings"); setRecipeLogMeal(meal); setView("recipeLog"); }}>
                          <span style={{fontSize:12,color:"#a78bfa",float:"right"}}>{Math.round(n.cal||0)} kcal/srv</span>
                          <div style={{fontSize:14,fontWeight:500,color:"#a78bfa"}}>📖 {r.name}</div>
                          <div style={{fontSize:11,color:"#475569"}}>{r.servings} {r.servings===1?"serving":"servings"} · {r.ingredients.length} ingredients</div>
                        </div>); })}
                    </div>);
                  })()}
                  {Object.entries(groupedByCategory).map(([cat,foods]) => (
                    <div key={cat}><div style={{fontSize:11,fontWeight:700,color:"#475569",padding:"10px 0 4px",letterSpacing:"0.05em",textTransform:"uppercase"}}>{cat}</div>
                      {foods.map(f => (<div key={f.id} style={S.srchItem} onClick={() => setSelectedFood(f)}><span style={{fontSize:12,color:"#f59e0b",float:"right"}}>{f.cal} kcal/100g</span><div style={{fontSize:14,fontWeight:500,color:"#e2e8f0"}}>{f.name}</div></div>))}
                    </div>
                  ))}
                  {filteredFoods.length===0 && recipes.filter(r=>r.name.toLowerCase().includes(searchTerm.toLowerCase())).length===0 && searchTerm.length>0 && <div style={{padding:20,textAlign:"center",color:"#475569",fontSize:14}}>No results for "{searchTerm}"</div>}
                </div>
              </>
            ) : (
              <div style={S.card}>
                <div style={{fontSize:16,fontWeight:700,marginBottom:4}}>{selectedFood.name}</div>
                <div style={{fontSize:12,color:"#64748b",marginBottom:16}}>{selectedFood.cat}</div>
                <label style={S.label}>Amount (g / ml)</label>
                <input style={S.input} type="number" value={amount} onChange={e=>setAmount(e.target.value)} inputMode="numeric"/>
                <div style={{display:"flex",gap:6,marginTop:8,flexWrap:"wrap",marginBottom:16}}>
                  {[25,50,100,150,200,250].map(q => <button key={q} style={S.pill(amount===String(q))} onClick={() => setAmount(String(q))}>{q}</button>)}
                </div>
                <label style={S.label}>Meal</label>
                <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:12}}>
                  {MEALS.map(m => <button key={m} style={S.pill(meal===m)} onClick={() => setMeal(m)}>{m}</button>)}
                </div>
                <div style={{background:"#0a0f1a",borderRadius:10,padding:12,marginBottom:16}}>
                  <div style={{fontSize:11,fontWeight:700,color:"#475569",marginBottom:8,textTransform:"uppercase"}}>Preview</div>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8}}>
                    {MACROS.map(k => { const val=(selectedFood[k]||0)*(parseFloat(amount)||0)/100; return (<div key={k} style={{textAlign:"center"}}><div style={{fontSize:16,fontWeight:700,color:NUTRIENT_META[k].color}}>{Math.round(val*10)/10}</div><div style={{fontSize:10,color:"#64748b"}}>{NUTRIENT_META[k].label}</div></div>); })}
                  </div>
                </div>
                <button style={{width:"100%",padding:14,borderRadius:12,border:"none",background:"#3b82f6",color:"#fff",fontSize:15,fontWeight:700,cursor:"pointer"}} onClick={addEntry}>{editingEntryId?"Save Changes":"Add to "+meal}</button>
              </div>
            )}
          </div>
        </div>
      );
    }

    if (addMode === "recipe") {
      return (
        <div style={S.app}>
          <div style={S.header}>
            <button style={{background:"none",border:"none",color:"#94a3b8",fontSize:15,cursor:"pointer"}} onClick={() => { setView("log"); setSearchTerm(""); }}>← Back</button>
            <span style={{fontSize:15,fontWeight:700}}>Log Recipe</span><div style={{width:64}}/>
          </div>
          <div style={S.section}><ModePicker/>
            {!recipes.length ? (
              <div style={{textAlign:"center",padding:"40px 0",color:"#475569"}}><div style={{fontSize:32,marginBottom:8}}>📖</div><div style={{fontSize:14,color:"#64748b"}}>No recipes yet</div><div style={{fontSize:12,marginTop:4}}>Go to Recipes tab to create one</div></div>
            ) : (
              <div>{recipes.map(r => { const n=r.nutrition_per_serving||{}; return (
                <div key={r.id} style={{...S.card,cursor:"pointer",marginBottom:8}} onClick={() => { setSelectedRecipe(r); setRecipeLogReturn("add"); setRecipeLogServings("1"); setRecipeLogGrams(""); setRecipeLogMode("servings"); setRecipeLogMeal(meal); setView("recipeLog"); }}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    <div style={{flex:1}}><div style={{fontSize:15,fontWeight:700,color:"#a78bfa",marginBottom:2}}>📖 {r.name}</div><div style={{fontSize:12,color:"#475569"}}>{r.servings} {r.servings===1?"serving":"servings"} · {r.ingredients.length} ingredients</div></div>
                    <div style={{textAlign:"right"}}><div style={{fontSize:14,fontWeight:700,color:NUTRIENT_META.cal.color}}>{Math.round(n.cal||0)}</div><div style={{fontSize:10,color:"#64748b"}}>kcal/srv</div></div>
                  </div>
                </div>); })}
              </div>
            )}
          </div>
        </div>
      );
    }

    if (addMode === "supplement") {
      return (
        <div style={S.app}>
          <div style={S.header}>
            <button style={{background:"none",border:"none",color:"#94a3b8",fontSize:15,cursor:"pointer"}} onClick={() => setView("log")}>← Back</button>
            <span style={{fontSize:15,fontWeight:700}}>Log Supplement</span><div style={{width:64}}/>
          </div>
          <div style={{...S.section,paddingBottom:40}}>
            <ModePicker/>
            {!supplementStacks.length ? (
              <div style={{textAlign:"center",padding:"30px 0",color:"#475569"}}><div style={{fontSize:32,marginBottom:8}}>💊</div><div style={{fontSize:14,color:"#64748b"}}>No stacks set up yet</div><div style={{fontSize:12,marginTop:4}}>Go to Settings → Supplements to create one</div></div>
            ) : (
              <div>
                <div style={{fontSize:12,color:"#64748b",marginBottom:10}}>Tap a stack to log it</div>
                {supplementStacks.map(stack => (
                  <div key={stack.id} style={{...S.card,cursor:"pointer",marginBottom:8}} onClick={() => openSuppLogConfirm(stack)}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                      <div><div style={{fontSize:15,fontWeight:700,color:"#c4b5fd"}}>💊 {stack.name}</div>
                        <div style={{fontSize:12,color:"#64748b",marginTop:2}}>{stack.items.length===0?"No items":`${stack.items.length} item${stack.items.length===1?"":"s"}: ${suppItemSummary(stack.items)}`}</div></div>
                      <div style={{color:"#475569",fontSize:18,paddingLeft:8}}>›</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div style={{marginTop:16}}>
              <div style={{fontSize:13,fontWeight:700,color:"#94a3b8",textTransform:"uppercase",letterSpacing:"0.05em",marginBottom:10}}>Log a one-off</div>
              <div style={S.card}>
                <label style={S.label}>Supplement name</label>
                <input style={{...S.input,marginBottom:12}} placeholder="e.g. Creatine" value={oneOffData.name} onChange={e=>setOneOffData(p=>({...p,name:e.target.value}))}/>
                <div style={{display:"flex",gap:8,marginBottom:12}}>
                  <div style={{flex:1}}><label style={S.label}>Dose</label><input style={S.input} type="number" inputMode="decimal" placeholder="e.g. 5" value={oneOffData.dose_amount} onChange={e=>setOneOffData(p=>({...p,dose_amount:e.target.value}))}/></div>
                  <div style={{width:90}}><label style={S.label}>Unit</label><select style={{...S.input,padding:"11px 8px"}} value={oneOffData.dose_unit} onChange={e=>setOneOffData(p=>({...p,dose_unit:e.target.value}))}>{SUPP_DOSE_UNITS.map(u=><option key={u}>{u}</option>)}</select></div>
                </div>
                {Object.keys(oneOffData.nutrients).length > 0 && (
                  <div style={{marginBottom:12}}>{Object.entries(oneOffData.nutrients).map(([k,v]) => (
                    <div key={k} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"4px 0",borderBottom:"1px solid #1e293b"}}>
                      <span style={{fontSize:13,color:"#e2e8f0"}}>{NUTRIENT_META[k]?.label||k}</span>
                      <div style={{display:"flex",alignItems:"center",gap:8}}><span style={{fontSize:13,color:"#a78bfa",fontWeight:600}}>{v} {NUTRIENT_META[k]?.unit||""}</span><button style={{background:"none",border:"none",color:"#ef4444",fontSize:14,cursor:"pointer",padding:"0 4px"}} onClick={()=>removeNutrientFromOneOff(k)}>×</button></div>
                    </div>))}
                  </div>
                )}
                <div style={{display:"flex",gap:6,marginBottom:12}}>
                  <select style={{...S.input,flex:1,padding:"8px 10px",fontSize:13}} value={oneOffNutKey} onChange={e=>setOneOffNutKey(e.target.value)}>
                    {NUTRIENT_ALL_KEYS.map(k=><option key={k} value={k}>{NUTRIENT_META[k].label} ({NUTRIENT_META[k].unit})</option>)}
                  </select>
                  <input style={{...S.input,width:80,padding:"8px 10px",fontSize:13}} type="number" inputMode="decimal" placeholder="0" value={oneOffNutVal} onChange={e=>setOneOffNutVal(e.target.value)}/>
                  <button style={{background:"#1d4ed8",border:"none",color:"#fff",borderRadius:10,padding:"8px 14px",fontSize:13,fontWeight:600,cursor:"pointer",whiteSpace:"nowrap"}} onClick={addNutrientToOneOff}>+ Add</button>
                </div>
                <button style={{width:"100%",padding:14,borderRadius:12,border:"none",background:oneOffData.name.trim()?"#7c3aed":"#1e293b",color:oneOffData.name.trim()?"#fff":"#64748b",fontSize:15,fontWeight:700,cursor:oneOffData.name.trim()?"pointer":"default"}} disabled={!oneOffData.name.trim()} onClick={logOneOff}>Log one-off</button>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
  // ── SUPPLEMENT LOG CONFIRMATION ───────────────────────────────────────
  if (view === "suppLogConfirm" && suppLogStack) {
    const checkedCount = suppLogItems.filter(i=>i.checked).length;
    return (
      <div style={S.app}>
        <div style={S.header}>
          <button style={{background:"none",border:"none",color:"#94a3b8",fontSize:15,cursor:"pointer"}} onClick={() => { setSuppLogStack(null); setSuppLogItems([]); setView("add"); }}>← Back</button>
          <span style={{fontSize:15,fontWeight:700}}>Log {suppLogStack.name}</span><div style={{width:48}}/>
        </div>
        <div style={S.section}>
          <div style={{fontSize:12,color:"#64748b",marginBottom:12}}>Uncheck items you didn't take. Tap dose to override.</div>
          <div style={S.card}>
            {suppLogItems.length===0 ? (
              <div style={{textAlign:"center",padding:"20px 0",color:"#475569",fontSize:13}}>This stack has no items. Edit it in Settings → Supplements.</div>
            ) : suppLogItems.map((item,idx) => (
              <div key={idx} style={{...S.suppRow,opacity:item.checked?1:0.4}}>
                <div style={{display:"flex",alignItems:"center",gap:10,flex:1}}>
                  <input type="checkbox" checked={item.checked} onChange={e=>setSuppLogItems(prev=>prev.map((x,i)=>i===idx?{...x,checked:e.target.checked}:x))} style={{width:18,height:18,accentColor:"#7c3aed",cursor:"pointer"}}/>
                  <div style={{flex:1}}>
                    <div style={{fontSize:14,fontWeight:500,color:"#e2e8f0"}}>{item.name}</div>
                    <div style={{fontSize:12,color:"#64748b",marginTop:2}}>Default: {item.dose_amount}{item.dose_unit}</div>
                  </div>
                </div>
                <div style={{width:90}}>
                  <input style={{...S.input,width:"100%",padding:"6px 8px",fontSize:13,textAlign:"right"}} type="number" inputMode="decimal" placeholder={String(item.dose_amount)} value={item.doseOverride}
                    onChange={e=>setSuppLogItems(prev=>prev.map((x,i)=>i===idx?{...x,doseOverride:e.target.value}:x))}/>
                  <div style={{fontSize:10,color:"#475569",textAlign:"right",marginTop:2}}>{item.dose_unit}</div>
                </div>
              </div>
            ))}
          </div>
          <button style={{width:"100%",padding:14,borderRadius:12,border:"none",marginTop:8,background:checkedCount>0?"#7c3aed":"#1e293b",color:checkedCount>0?"#fff":"#64748b",fontSize:15,fontWeight:700,cursor:checkedCount>0?"pointer":"default"}} disabled={checkedCount===0} onClick={logSuppStack}>
            Log {checkedCount} item{checkedCount===1?"":"s"} — {suppLogStack.name}
          </button>
        </div>
      </div>
    );
  }

  // ── STACK EDITOR ──────────────────────────────────────────────────────
  if (view === "stackEditor") {
    const canSave = stackEditorName.trim().length > 0;
    return (
      <div style={S.app}>
        <div style={S.header}>
          <button style={{background:"none",border:"none",color:"#94a3b8",fontSize:15,cursor:"pointer"}} onClick={() => setView("settings")}>← Back</button>
          <span style={{fontSize:15,fontWeight:700}}>{editingStackId?"Edit Stack":"New Stack"}</span>
          <button style={{background:"none",border:"none",fontSize:13,fontWeight:700,cursor:canSave?"pointer":"default",color:canSave?"#3b82f6":"#334155"}} onClick={saveStack} disabled={!canSave}>Save</button>
        </div>
        <div style={S.section}>
          <div style={S.card}>
            <label style={S.label}>Stack name</label>
            <input style={{...S.input,marginBottom:8}} placeholder="e.g. AM, PM, Pre-ride" value={stackEditorName} onChange={e=>setStackEditorName(e.target.value)}/>
            <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
              {["AM","PM","Pre-ride","Post-ride","Evening"].map(n => (<button key={n} style={S.pill(stackEditorName===n)} onClick={()=>setStackEditorName(n)}>{n}</button>))}
            </div>
          </div>
          <div style={S.card}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
              <div style={{fontSize:13,fontWeight:700,color:"#94a3b8",textTransform:"uppercase",letterSpacing:"0.05em"}}>Items {stackEditorItems.length>0?`(${stackEditorItems.length})`:""}</div>
              <button style={{background:"#1d4ed8",border:"none",color:"#fff",borderRadius:8,padding:"6px 12px",fontSize:12,fontWeight:600,cursor:"pointer"}} onClick={() => openItemEditor(null)}>+ Add item</button>
            </div>
            {stackEditorItems.length===0 ? (
              <div style={{textAlign:"center",padding:"20px 0",color:"#475569",fontSize:13}}>No items yet — tap + Add item</div>
            ) : stackEditorItems.map((item,idx) => (
              <div key={idx} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 0",borderBottom:idx<stackEditorItems.length-1?"1px solid #1e293b":"none"}}>
                <div style={{flex:1,cursor:"pointer"}} onClick={() => openItemEditor(idx)}>
                  <div style={{fontSize:14,fontWeight:500,color:"#e2e8f0"}}>{item.name}</div>
                  <div style={{fontSize:12,color:"#64748b"}}>{item.dose_amount}{item.dose_unit}{Object.keys(item.nutrients).length>0&&<span style={{color:"#a78bfa",marginLeft:6}}>· {Object.keys(item.nutrients).length} nutrient{Object.keys(item.nutrients).length===1?"":"s"}</span>}</div>
                </div>
                <button style={{background:"none",border:"none",color:"#ef4444",fontSize:18,cursor:"pointer",padding:"4px 8px"}} onClick={() => removeItemFromStack(idx)}>×</button>
              </div>
            ))}
          </div>
          {editingStackId && (<button style={{width:"100%",padding:14,borderRadius:12,border:"1px solid #ef4444",background:"transparent",color:"#ef4444",fontSize:14,fontWeight:600,cursor:"pointer",marginBottom:20}} onClick={() => deleteStack(editingStackId)}>Delete Stack</button>)}
        </div>
      </div>
    );
  }

  // ── ITEM EDITOR ───────────────────────────────────────────────────────
  if (view === "itemEditor") {
    const canSave = itemEditorData.name.trim().length > 0;
    return (
      <div style={S.app}>
        <div style={S.header}>
          <button style={{background:"none",border:"none",color:"#94a3b8",fontSize:15,cursor:"pointer"}} onClick={() => setView("stackEditor")}>← Back</button>
          <span style={{fontSize:15,fontWeight:700}}>{editingItemIdx!==null&&editingItemIdx!==undefined?"Edit Item":"New Item"}</span>
          <button style={{background:"none",border:"none",fontSize:13,fontWeight:700,cursor:canSave?"pointer":"default",color:canSave?"#3b82f6":"#334155"}} onClick={saveItem} disabled={!canSave}>Save</button>
        </div>
        <div style={S.section}>
          <div style={S.card}>
            <label style={S.label}>Supplement name</label>
            <input style={{...S.input,marginBottom:12}} placeholder="e.g. Vitamin B12" value={itemEditorData.name} onChange={e=>setItemEditorData(p=>({...p,name:e.target.value}))}/>
            <div style={{display:"flex",gap:8,marginBottom:4}}>
              <div style={{flex:1}}><label style={S.label}>Dose amount</label><input style={S.input} type="number" inputMode="decimal" placeholder="e.g. 1000" value={itemEditorData.dose_amount} onChange={e=>setItemEditorData(p=>({...p,dose_amount:e.target.value}))}/></div>
              <div style={{width:100}}><label style={S.label}>Unit</label><select style={{...S.input,padding:"11px 8px"}} value={itemEditorData.dose_unit} onChange={e=>setItemEditorData(p=>({...p,dose_unit:e.target.value}))}>{SUPP_DOSE_UNITS.map(u=><option key={u}>{u}</option>)}</select></div>
            </div>
          </div>
          <div style={S.card}>
            <div style={{fontSize:13,fontWeight:700,color:"#94a3b8",textTransform:"uppercase",letterSpacing:"0.05em",marginBottom:4}}>Nutrient contributions</div>
            <div style={{fontSize:11,color:"#475569",marginBottom:12}}>Optional. Only add if this supplement provides trackable nutrients.</div>
            {Object.keys(itemEditorData.nutrients).length > 0 && (
              <div style={{marginBottom:12}}>{Object.entries(itemEditorData.nutrients).map(([k,v]) => (
                <div key={k} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"6px 0",borderBottom:"1px solid #1e293b"}}>
                  <span style={{fontSize:13,color:"#e2e8f0"}}>{NUTRIENT_META[k]?.label||k}</span>
                  <div style={{display:"flex",alignItems:"center",gap:8}}><span style={{fontSize:13,color:"#a78bfa",fontWeight:600}}>{v} {NUTRIENT_META[k]?.unit||""}</span><button style={{background:"none",border:"none",color:"#ef4444",fontSize:14,cursor:"pointer",padding:"0 4px"}} onClick={()=>removeNutrientFromItem(k)}>×</button></div>
                </div>))}
              </div>
            )}
            <div style={{display:"flex",gap:6,marginBottom:4}}>
              <select style={{...S.input,flex:1,padding:"8px 10px",fontSize:13}} value={itemNutKey} onChange={e=>setItemNutKey(e.target.value)}>
                {NUTRIENT_ALL_KEYS.map(k=><option key={k} value={k}>{NUTRIENT_META[k].label} ({NUTRIENT_META[k].unit})</option>)}
              </select>
              <input style={{...S.input,width:80,padding:"8px 10px",fontSize:13}} type="number" inputMode="decimal" placeholder="0" value={itemNutVal} onChange={e=>setItemNutVal(e.target.value)}/>
              <button style={{background:"#1d4ed8",border:"none",color:"#fff",borderRadius:10,padding:"8px 14px",fontSize:13,fontWeight:600,cursor:"pointer",whiteSpace:"nowrap"}} onClick={addNutrientToItem}>+ Add</button>
            </div>
            <div style={{fontSize:11,color:"#475569",marginTop:4}}>e.g. select "B12 (mcg)", enter 1000, tap + Add</div>
          </div>
        </div>
      </div>
    );
  }
  // ── RECIPES LIBRARY ───────────────────────────────────────────────────
  if (view === "recipes") {
    return (
      <div style={S.app}>
        <div style={S.header}><span style={{fontSize:17,fontWeight:700}}>Recipes</span><button style={{background:"#3b82f6",border:"none",color:"#fff",borderRadius:10,padding:"8px 16px",fontSize:13,fontWeight:700,cursor:"pointer"}} onClick={startNewRecipe}>+ New</button></div>
        <div style={{...S.section,paddingBottom:20}}>
          {recipes.length===0 ? (<div style={{textAlign:"center",padding:"60px 0",color:"#475569"}}><div style={{fontSize:40,marginBottom:12}}>📖</div><div style={{fontSize:15,fontWeight:600,color:"#64748b",marginBottom:6}}>No recipes yet</div><div style={{fontSize:13}}>Tap + New to create your first recipe</div></div>
          ) : (<div style={{marginTop:8}}>{recipes.map(r => { const n=r.nutrition_per_serving||{}; return (
            <div key={r.id} style={{...S.card,cursor:"pointer"}} onClick={() => { setSelectedRecipe(r); setView("recipeDetail"); }}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                <div style={{flex:1}}>
                  <div style={{fontSize:15,fontWeight:700,color:"#e2e8f0",marginBottom:2}}>{r.name}</div>
                  <div style={{fontSize:12,color:"#475569",marginBottom:8}}>{r.servings} {r.servings===1?"serving":"servings"}{r.source?` · ${r.source}`:""} · {r.ingredients.length} ingredients</div>
                  <div style={{display:"flex",gap:12}}>{[{k:"cal",l:"kcal"},{k:"pro",l:"pro"},{k:"carb",l:"carb"},{k:"fat",l:"fat"}].map(({k,l}) => (<div key={k} style={{textAlign:"center"}}><div style={{fontSize:13,fontWeight:700,color:NUTRIENT_META[k].color}}>{Math.round((n[k]||0)*10)/10}</div><div style={{fontSize:10,color:"#64748b"}}>{l}/srv</div></div>))}</div>
                </div>
                <div style={{color:"#475569",fontSize:18,paddingLeft:8}}>›</div>
              </div>
            </div>); })}</div>
          )}
        </div>
        <BottomNav/>
      </div>
    );
  }

  // ── RECIPE DETAIL ─────────────────────────────────────────────────────
  if (view === "recipeDetail" && selectedRecipe) {
    const r=selectedRecipe, n=r.nutrition_per_serving||{};
    return (
      <div style={S.app}>
        <div style={S.header}><button style={{background:"none",border:"none",color:"#94a3b8",fontSize:15,cursor:"pointer"}} onClick={()=>setView("recipes")}>← Back</button><span style={{fontSize:15,fontWeight:700,flex:1,textAlign:"center",marginRight:48}}>{r.name}</span><button style={{background:"none",border:"none",color:"#3b82f6",fontSize:13,fontWeight:600,cursor:"pointer"}} onClick={()=>startEditRecipe(r)}>Edit</button></div>
        <div style={S.section}>
          {r.source?<div style={{fontSize:12,color:"#475569",marginBottom:12,paddingTop:2}}>Source: {r.source}</div>:null}
          <div style={S.card}><div style={{fontSize:11,fontWeight:700,color:"#475569",marginBottom:12,textTransform:"uppercase",letterSpacing:"0.05em"}}>Per serving ({r.servings} total)</div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:8,marginBottom:12}}>{MACROS.map(k=>(<div key={k} style={{textAlign:"center"}}><div style={{fontSize:15,fontWeight:700,color:NUTRIENT_META[k].color}}>{Math.round((n[k]||0)*10)/10}</div><div style={{fontSize:10,color:"#64748b"}}>{NUTRIENT_META[k].label}</div></div>))}</div>
            <div style={{borderTop:"1px solid #1e293b",paddingTop:10}}><div style={{fontSize:11,fontWeight:700,color:"#475569",marginBottom:8,textTransform:"uppercase",letterSpacing:"0.04em"}}>Key micros / serving</div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"4px 16px"}}>{["iron","calc","zinc","b12","omega3","fol"].map(k=>(<div key={k} style={{display:"flex",justifyContent:"space-between",fontSize:12}}><span style={{color:"#94a3b8"}}>{NUTRIENT_META[k].label}</span><span style={{color:NUTRIENT_META[k].color,fontWeight:600}}>{Math.round((n[k]||0)*10)/10}{NUTRIENT_META[k].unit}</span></div>))}</div>
            </div>
          </div>
          <div style={S.card}><div style={{fontSize:13,fontWeight:700,color:"#94a3b8",marginBottom:10,textTransform:"uppercase",letterSpacing:"0.05em"}}>Ingredients ({r.ingredients.length})</div>
            {r.ingredients.map((ing,i)=>{ const food=allFoods.find(f=>f.id===ing.foodId),ingCal=food?Math.round(food.cal*ing.amount_g/100):0; return (<div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 0",borderBottom:i<r.ingredients.length-1?"1px solid #1e293b":"none"}}><div><div style={{fontSize:13,color:"#e2e8f0"}}>{ing.foodName}</div><div style={{fontSize:11,color:"#64748b"}}>{ing.amount_g}g</div></div><span style={{fontSize:12,color:"#f59e0b",fontWeight:600}}>{ingCal} kcal</span></div>); })}
          </div>
          <button style={{width:"100%",padding:14,borderRadius:12,border:"none",background:"#3b82f6",color:"#fff",fontSize:15,fontWeight:700,cursor:"pointer",marginBottom:10}} onClick={()=>{setRecipeLogServings("1");setRecipeLogGrams("");setRecipeLogMode("servings");setRecipeLogMeal("Breakfast");setView("recipeLog");}}>Log Recipe</button>
          <button style={{width:"100%",padding:14,borderRadius:12,border:"1px solid #ef4444",background:"transparent",color:"#ef4444",fontSize:14,fontWeight:600,cursor:"pointer",marginBottom:20}} onClick={()=>deleteRecipe(r.id)}>Delete Recipe</button>
        </div>
        <BottomNav/>
      </div>
    );
  }

  // ── RECIPE LOG ────────────────────────────────────────────────────────
  if (view === "recipeLog" && selectedRecipe) {
    const r=selectedRecipe, rs=Math.max(Number(r.servings)||1,0.01), tw=r.ingredients.reduce((s,i)=>s+i.amount_g,0);
    let frac=0; if(recipeLogMode==="servings") frac=(parseFloat(recipeLogServings)||0)/rs; else { const g=parseFloat(recipeLogGrams)||0; frac=tw>0?g/tw:0; }
    const previewNut={}; Object.keys(NUTRIENT_META).forEach(k=>previewNut[k]=0);
    r.ingredients.forEach(ing=>{const food=allFoods.find(f=>f.id===ing.foodId);if(!food)return;const m=(ing.amount_g*frac)/100;Object.keys(NUTRIENT_META).forEach(k=>{previewNut[k]+=(food[k]||0)*m;});});
    const perServingNut={}; Object.keys(NUTRIENT_META).forEach(k=>perServingNut[k]=0);
    r.ingredients.forEach(ing=>{const food=allFoods.find(f=>f.id===ing.foodId);if(!food)return;const m=(ing.amount_g/rs)/100;Object.keys(NUTRIENT_META).forEach(k=>{perServingNut[k]+=(food[k]||0)*m;});});
    const canLog=frac>0;
    return (
      <div style={S.app}>
        <div style={S.header}><button style={{background:"none",border:"none",color:"#94a3b8",fontSize:15,cursor:"pointer"}} onClick={()=>setView(recipeLogReturn)}>← Back</button><span style={{fontSize:15,fontWeight:700}}>Log Recipe</span><div style={{width:48}}/></div>
        <div style={S.section}>
          <div style={{fontSize:14,fontWeight:600,color:"#a78bfa",marginBottom:12}}>📖 {r.name}</div>
          <div style={S.card}>
            <div style={{display:"flex",background:"#0a0f1a",borderRadius:10,padding:4,marginBottom:16}}>
              {[["servings","By Servings"],["grams","By Weight"]].map(([mode,label])=>(<button key={mode} style={{flex:1,padding:"8px 0",borderRadius:8,border:"none",cursor:"pointer",fontSize:13,fontWeight:600,background:recipeLogMode===mode?"#1d4ed8":"transparent",color:recipeLogMode===mode?"#fff":"#64748b"}} onClick={()=>setRecipeLogMode(mode)}>{label}</button>))}
            </div>
            {recipeLogMode==="servings"?(<>
              <label style={S.label}>Servings to log — 1 serving = {Math.round(perServingNut.cal||0)} kcal</label>
              <div style={{fontSize:11,color:"#475569",marginBottom:8}}>Recipe has {r.servings} {r.servings===1?"serving":"servings"} total</div>
              <input style={S.input} type="number" inputMode="decimal" value={recipeLogServings} onChange={e=>setRecipeLogServings(e.target.value)}/>
              <div style={{display:"flex",gap:6,marginTop:8,flexWrap:"wrap"}}>{[...new Set([0.5,...Array.from({length:r.servings},(_,i)=>i+1)])].map(q=>(<button key={q} style={S.pill(recipeLogServings===String(q))} onClick={()=>setRecipeLogServings(String(q))}>{q===0.5?"½":q}</button>))}</div>
            </>):(<>
              <label style={S.label}>Weight (g) — recipe ingredients total {tw}g</label>
              <input style={S.input} type="number" inputMode="numeric" value={recipeLogGrams} onChange={e=>setRecipeLogGrams(e.target.value)} placeholder={`e.g. ${Math.round(tw/r.servings)}`}/>
              <div style={{display:"flex",gap:6,marginTop:8,flexWrap:"wrap"}}>{[0.5,1,1.5].map(mult=>{const q=Math.round(tw*mult/r.servings);return q>0?<button key={mult} style={S.pill(recipeLogGrams===String(q))} onClick={()=>setRecipeLogGrams(String(q))}>{q}g</button>:null;})}</div>
              <div style={{fontSize:11,color:"#475569",marginTop:8}}>Based on raw ingredient weights</div>
            </>)}
            <div style={{background:"#0a0f1a",borderRadius:10,padding:12,margin:"16px 0"}}><div style={{fontSize:11,fontWeight:700,color:"#475569",marginBottom:8,textTransform:"uppercase"}}>Preview</div><div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:6}}>{MACROS.map(k=>(<div key={k} style={{textAlign:"center"}}><div style={{fontSize:14,fontWeight:700,color:NUTRIENT_META[k].color}}>{Math.round((previewNut[k]||0)*10)/10}</div><div style={{fontSize:10,color:"#64748b"}}>{NUTRIENT_META[k].label}</div></div>))}</div></div>
            <label style={S.label}>Meal</label>
            <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:12}}>{MEALS.map(m=><button key={m} style={S.pill(recipeLogMeal===m)} onClick={()=>setRecipeLogMeal(m)}>{m}</button>)}</div>
            <button style={{width:"100%",padding:14,borderRadius:12,border:"none",background:canLog?"#3b82f6":"#1e293b",color:canLog?"#fff":"#64748b",fontSize:15,fontWeight:700,cursor:"pointer"}} disabled={!canLog} onClick={logRecipe}>Add to {recipeLogMeal}</button>
          </div>
        </div>
        <BottomNav/>
      </div>
    );
  }

  // ── RECIPE CREATE / EDIT ──────────────────────────────────────────────
  if (view === "recipeCreate") {
    const curServings=parseFloat(recipeInProgress.servings)||1;
    const previewNut=recipeInProgress.ingredients.length>0?calcRecipeNutritionPerServing(recipeInProgress.ingredients,curServings,allFoods):null;
    const canSave=recipeInProgress.name.trim().length>0&&recipeInProgress.ingredients.length>0;
    return (
      <div style={S.app}>
        <div style={S.header}><button style={{background:"none",border:"none",color:"#94a3b8",fontSize:15,cursor:"pointer"}} onClick={()=>{setEditingRecipeId(null);setView("recipes");}}>← Back</button><span style={{fontSize:15,fontWeight:700}}>{editingRecipeId?"Edit Recipe":"New Recipe"}</span><button style={{background:"none",border:"none",fontSize:13,fontWeight:700,cursor:"pointer",color:canSave?"#3b82f6":"#334155"}} onClick={saveRecipe} disabled={!canSave}>Save</button></div>
        <div style={S.section}>
          <div style={S.card}>
            <label style={S.label}>Recipe name *</label><input style={{...S.input,marginBottom:12}} placeholder="e.g. Red Lentil Dal" value={recipeInProgress.name} onChange={e=>setRecipeInProgress(p=>({...p,name:e.target.value}))}/>
            <label style={S.label}>Source (optional)</label><input style={{...S.input,marginBottom:12}} placeholder="e.g. Mum's recipe" value={recipeInProgress.source} onChange={e=>setRecipeInProgress(p=>({...p,source:e.target.value}))}/>
            <label style={S.label}>Number of servings</label><input style={{...S.input,marginBottom:6}} type="number" inputMode="decimal" value={recipeInProgress.servings} onChange={e=>setRecipeInProgress(p=>({...p,servings:e.target.value}))}/>
            <div style={{display:"flex",gap:6,marginTop:6,flexWrap:"wrap"}}>{[1,2,3,4,6,8].map(n=><button key={n} style={S.pill(recipeInProgress.servings===String(n))} onClick={()=>setRecipeInProgress(p=>({...p,servings:String(n)}))}>{n}</button>)}</div>
          </div>
          {previewNut&&(<div style={{...S.card,background:"#0a0f1a"}}><div style={{fontSize:11,fontWeight:700,color:"#475569",marginBottom:8,textTransform:"uppercase",letterSpacing:"0.05em"}}>Per serving preview</div><div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:6}}>{MACROS.map(k=>(<div key={k} style={{textAlign:"center"}}><div style={{fontSize:14,fontWeight:700,color:NUTRIENT_META[k].color}}>{Math.round((previewNut[k]||0)*10)/10}</div><div style={{fontSize:10,color:"#64748b"}}>{NUTRIENT_META[k].label}</div></div>))}</div></div>)}
          <div style={S.card}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}><div style={{fontSize:13,fontWeight:700,color:"#94a3b8",textTransform:"uppercase",letterSpacing:"0.05em"}}>Ingredients {recipeInProgress.ingredients.length>0?`(${recipeInProgress.ingredients.length})`:""}</div><button style={{background:"#1d4ed8",border:"none",color:"#fff",borderRadius:8,padding:"6px 12px",fontSize:12,fontWeight:600,cursor:"pointer"}} onClick={()=>{setRecipeIngSearch("");setRecipeIngSelected(null);setRecipeIngAmount("100");setView("recipeIngAdd");setTimeout(()=>recipeIngRef.current?.focus(),100);}}>+ Add</button></div>
            {recipeInProgress.ingredients.length===0?(<div style={{textAlign:"center",padding:"20px 0",color:"#475569",fontSize:13}}>No ingredients yet — tap + Add</div>):recipeInProgress.ingredients.map((ing,i)=>{const food=allFoods.find(f=>f.id===ing.foodId),ingCal=food?Math.round(food.cal*ing.amount_g/100):0;return(<div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 0",borderBottom:i<recipeInProgress.ingredients.length-1?"1px solid #1e293b":"none"}}><div style={{flex:1}}><div style={{fontSize:13,color:"#e2e8f0"}}>{ing.foodName}</div><div style={{fontSize:11,color:"#64748b"}}>{ing.amount_g}g · {ingCal} kcal</div></div><button style={{background:"none",border:"none",color:"#ef4444",fontSize:18,cursor:"pointer",padding:"4px 8px"}} onClick={()=>removeIngFromRecipe(i)}>×</button></div>);})}
          </div>
          {!canSave&&(<div style={{fontSize:12,color:"#475569",textAlign:"center",paddingBottom:20}}>{recipeInProgress.name.trim()===""?"Add a recipe name to save":"Add at least one ingredient to save"}</div>)}
        </div>
        <BottomNav/>
      </div>
    );
  }

  // ── RECIPE INGREDIENT ADD ─────────────────────────────────────────────
  if (view === "recipeIngAdd") {
    return (
      <div style={S.app}>
        <div style={S.header}><button style={{background:"none",border:"none",color:"#94a3b8",fontSize:15,cursor:"pointer"}} onClick={()=>{setRecipeIngSelected(null);setRecipeIngSearch("");setView("recipeCreate");}}>← Back</button><span style={{fontSize:15,fontWeight:700}}>{recipeIngSelected?"Set Amount":"Add Ingredient"}</span>{!recipeIngSelected?<button style={{background:"none",border:"none",color:"#3b82f6",fontSize:13,cursor:"pointer",fontWeight:600}} onClick={()=>setView("customAdd")}>+ Custom</button>:<div style={{width:64}}/>}</div>
        {!recipeIngSelected ? (
          <div style={S.section}>
            <input ref={recipeIngRef} style={S.input} placeholder="Search foods…" value={recipeIngSearch} onChange={e=>setRecipeIngSearch(e.target.value)} autoFocus/>
            <div style={{marginTop:12,maxHeight:"calc(100vh - 160px)",overflowY:"auto"}}>
              {Object.entries(groupedIngByCategory).map(([cat,foods])=>(<div key={cat}><div style={{fontSize:11,fontWeight:700,color:"#475569",padding:"10px 0 4px",letterSpacing:"0.05em",textTransform:"uppercase"}}>{cat}</div>{foods.map(f=>(<div key={f.id} style={S.srchItem} onClick={()=>setRecipeIngSelected(f)}><span style={{fontSize:12,color:"#f59e0b",float:"right"}}>{f.cal} kcal/100g</span><div style={{fontSize:14,fontWeight:500,color:"#e2e8f0"}}>{f.name}</div></div>))}</div>))}
              {filteredIngFoods.length===0&&<div style={{padding:20,textAlign:"center",color:"#475569",fontSize:14}}>No foods found for "{recipeIngSearch}"</div>}
            </div>
          </div>
        ) : (
          <div style={S.section}>
            <div style={S.card}>
              <div style={{fontSize:16,fontWeight:700,marginBottom:4}}>{recipeIngSelected.name}</div><div style={{fontSize:12,color:"#64748b",marginBottom:16}}>{recipeIngSelected.cat}</div>
              <label style={S.label}>Amount (g)</label>
              <input style={S.input} type="number" inputMode="numeric" value={recipeIngAmount} onChange={e=>setRecipeIngAmount(e.target.value)}/>
              <div style={{display:"flex",gap:6,marginTop:8,flexWrap:"wrap",marginBottom:16}}>{[25,50,100,150,200,250,300,400,500].map(q=><button key={q} style={S.pill(recipeIngAmount===String(q))} onClick={()=>setRecipeIngAmount(String(q))}>{q}</button>)}</div>
              <div style={{background:"#0a0f1a",borderRadius:10,padding:12,marginBottom:16}}><div style={{fontSize:11,fontWeight:700,color:"#475569",marginBottom:8,textTransform:"uppercase"}}>Preview</div><div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:6}}>{MACROS.map(k=>{const val=(recipeIngSelected[k]||0)*(parseFloat(recipeIngAmount)||0)/100;return(<div key={k} style={{textAlign:"center"}}><div style={{fontSize:14,fontWeight:700,color:NUTRIENT_META[k].color}}>{Math.round(val*10)/10}</div><div style={{fontSize:10,color:"#64748b"}}>{NUTRIENT_META[k].label}</div></div>);})}</div></div>
              <button style={{width:"100%",padding:14,borderRadius:12,border:"none",background:(parseFloat(recipeIngAmount)||0)>0?"#3b82f6":"#1e293b",color:(parseFloat(recipeIngAmount)||0)>0?"#fff":"#64748b",fontSize:15,fontWeight:700,cursor:"pointer"}} disabled={(parseFloat(recipeIngAmount)||0)<=0} onClick={addIngredientToRecipe}>Add to Recipe</button>
            </div>
          </div>
        )}
        <BottomNav/>
      </div>
    );
  }
  // ── EXERCISE ──────────────────────────────────────────────────────────
  if (view === "exercise") {
    const wt=parseFloat(profile.weightKg)||70, act=EXERCISE_ACTIVITIES.find(a=>a.id===exActivity);
    const dur=parseFloat(exDuration)||0, autoBurn=Math.round(act.met*wt*(dur/60));
    const burn=exBurnEdit!==""?parseInt(exBurnEdit)||0:autoBurn;
    const actGroups=EXERCISE_ACTIVITIES.reduce((acc,a)=>{if(!acc[a.label])acc[a.label]=[];acc[a.label].push(a);return acc;},{});
    return (
      <div style={S.app}>
        <div style={S.header}><button style={{background:"none",border:"none",color:"#94a3b8",fontSize:15,cursor:"pointer"}} onClick={()=>setView("log")}>← Back</button><span style={{fontSize:15,fontWeight:700}}>Log Exercise</span><div style={{width:48}}/></div>
        <div style={S.section}>
          {!profile.weightKg&&<div style={{background:"#2d1f00",border:"1px solid #f59e0b",borderRadius:10,padding:"10px 14px",marginBottom:12,fontSize:12,color:"#f59e0b"}}>No weight set in Settings — using 70kg default</div>}
          <div style={S.card}>
            <label style={S.label}>Activity</label>
            {Object.entries(actGroups).map(([grp,acts])=>(<div key={grp} style={{marginBottom:10}}><div style={{fontSize:11,color:"#475569",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.05em",marginBottom:6}}>{grp}</div><div style={{display:"flex",gap:6,flexWrap:"wrap"}}>{acts.map(a=><button key={a.id} style={S.pill(exActivity===a.id)} onClick={()=>{setExActivity(a.id);setExBurnEdit("");}}>{a.intensity}</button>)}</div></div>))}
            <label style={{...S.label,marginTop:8}}>Duration (minutes)</label>
            <input style={S.input} type="number" inputMode="numeric" value={exDuration} onChange={e=>{setExDuration(e.target.value);setExBurnEdit("");}}/>
            <div style={{display:"flex",gap:6,marginTop:8,flexWrap:"wrap",marginBottom:16}}>{[30,45,60,90,120,180].map(d=><button key={d} style={S.pill(exDuration===String(d)&&exBurnEdit==="")} onClick={()=>{setExDuration(String(d));setExBurnEdit("");}}>{d}</button>)}</div>
            <div style={{background:"#0a0f1a",borderRadius:10,padding:14,marginBottom:16}}>
              <div style={{fontSize:11,fontWeight:700,color:"#475569",marginBottom:10,textTransform:"uppercase"}}>Estimated Burn</div>
              <div style={{display:"flex",alignItems:"center",gap:12}}><div style={{fontSize:32,fontWeight:700,color:"#4ade80"}}>{burn}</div><div style={{fontSize:12,color:"#64748b"}}>kcal<br/>{act.label} · {act.intensity}<br/>{dur} min @ MET {act.met}</div></div>
              <div style={{marginTop:12}}><label style={S.label}>Override (optional)</label><input style={S.input} type="number" inputMode="numeric" placeholder={"Auto: "+autoBurn+" kcal"} value={exBurnEdit} onChange={e=>setExBurnEdit(e.target.value)}/></div>
            </div>
            <button style={{width:"100%",padding:14,borderRadius:12,border:"none",background:dur>0?"#16a34a":"#1e293b",color:dur>0?"#fff":"#64748b",fontSize:15,fontWeight:700,cursor:"pointer"}} disabled={dur<=0} onClick={()=>addExercise(exBurnEdit!==""?parseInt(exBurnEdit)||autoBurn:undefined)}>Log Exercise</button>
          </div>
        </div>
      </div>
    );
  }

  // ── CUSTOM FOOD ───────────────────────────────────────────────────────
  if (view === "customAdd") {
    const fields=[{k:"cal",l:"Calories (kcal)"},{k:"pro",l:"Protein (g)"},{k:"carb",l:"Carbs (g)"},{k:"fat",l:"Fat (g)"},{k:"fib",l:"Fibre (g)"},{k:"iron",l:"Iron (mg)"},{k:"calc",l:"Calcium (mg)"},{k:"zinc",l:"Zinc (mg)"},{k:"b12",l:"B12 (mcg)"},{k:"vitD",l:"Vitamin D (mcg)"},{k:"omega3",l:"Omega-3 (g)"},{k:"iod",l:"Iodine (mcg)"},{k:"sel",l:"Selenium (mcg)"},{k:"mag",l:"Magnesium (mg)"},{k:"pot",l:"Potassium (mg)"},{k:"fol",l:"Folate (mcg)"}];
    return (
      <div style={S.app}>
        <div style={S.header}><button style={{background:"none",border:"none",color:"#94a3b8",fontSize:15,cursor:"pointer"}} onClick={()=>setView("add")}>← Back</button><span style={{fontSize:15,fontWeight:700}}>Add Custom Food</span><div style={{width:48}}/></div>
        <div style={S.section}><div style={S.card}>
          <div style={{fontSize:12,color:"#64748b",marginBottom:12}}>All values per 100g or 100ml.</div>
          <label style={S.label}>Food name *</label><input style={{...S.input,marginBottom:12}} placeholder="e.g. Alpro Oat Yogurt" value={cf.name} onChange={e=>setCf(p=>({...p,name:e.target.value}))}/>
          {fields.map(({k,l})=>(<div key={k} style={S.cfRow}><span style={{fontSize:13,color:"#e2e8f0",width:160}}>{l}</span><input style={{...S.input,width:90,textAlign:"right",padding:"8px 12px"}} type="number" inputMode="decimal" placeholder="0" value={cf[k]} onChange={e=>setCf(p=>({...p,[k]:e.target.value}))}/></div>))}
          <button style={{width:"100%",marginTop:16,padding:14,borderRadius:12,border:"none",background:cf.name.trim()&&cf.cal?"#3b82f6":"#1e293b",color:cf.name.trim()&&cf.cal?"#fff":"#64748b",fontSize:15,fontWeight:700,cursor:"pointer"}} onClick={saveCustomFood} disabled={!cf.name.trim()||!cf.cal}>Save Food</button>
        </div></div>
      </div>
    );
  }

  // ── GOALS ─────────────────────────────────────────────────────────────
  if (view === "goals") {
    const wt  = parseFloat(profile.weightKg) || 70;
    const ht  = parseFloat(profile.heightCm)  || 170;
    const hasProfile = !!(profile.weightKg && profile.heightCm && profile.age && profile.sex);
    const proMultiplierDisplay = Math.min(2.0, 1.0 + exerciseBurn / (resolvedGoals.cal || 2000));
    const sections = [{ title:"Macros", keys:MACROS }, { title:"Micros", keys:MICROS }];
    return (
      <div style={S.app}>
        <div style={S.header}><span style={{fontSize:17,fontWeight:700}}>Daily Goals</span></div>
        <div style={S.section}>
          {!hasProfile && (
            <div style={{background:"#1c1200",border:"1px solid #854d0e",borderRadius:10,padding:"10px 14px",marginBottom:12,fontSize:12,color:"#fbbf24"}}>
              ⚠️ Complete your profile (Settings → Profile) for accurate auto-computed goals.
            </div>
          )}
          <details style={{marginBottom:12}}>
            <summary style={{listStyle:"none",outline:"none",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px 14px",background:"#0f172a",borderRadius:10,border:"1px solid #1e293b",userSelect:"none"}}>
              <span style={{fontSize:13,fontWeight:600,color:"#94a3b8"}}>How goals are calculated</span>
              <span style={{fontSize:16,color:"#475569",fontWeight:700,lineHeight:1}}>ⓘ</span>
            </summary>
            <div style={{background:"#0f172a",borderRadius:"0 0 10px 10px",padding:"10px 14px 12px",border:"1px solid #1e293b",borderTop:"none",marginTop:-1}}>
              <div style={{fontSize:12,color:"#64748b",lineHeight:1.6,marginBottom:hasProfile?10:0}}>Goals are computed from your profile using BMR/TDEE formulas and vegan-adjusted RDAs. Override any value by typing in the field — it highlights in amber. Tap ↺ to restore.</div>
              {hasProfile && (
                <div style={{padding:"8px 10px",background:"#0a0f1a",borderRadius:8,fontSize:12,color:"#94a3b8"}}>
                  <div>BMR: {Math.round((10*wt)+(6.25*ht)-(5*(parseFloat(profile.age)||30))+((profile.sex!=="Female")?5:-161))} kcal · TDEE base: {goals.cal} kcal</div>
                  <div style={{marginTop:4}}>Protein base: {goals.pro}g ({wt}kg × 1g/kg){exerciseBurn>0&&<span style={{color:"#4ade80"}}> → {Math.round(goals.pro*proMultiplierDisplay)}g today ({proMultiplierDisplay.toFixed(2)}× multiplier)</span>}</div>
                  <div style={{marginTop:4,color:"#64748b"}}>Fat: {goals.fat}g (25% TDEE ÷ 9) · Carbs: {goals.carb}g (residual) · Fibre: {goals.fib}g (14g/1000kcal)</div>
                </div>
              )}
            </div>
          </details>
          {sections.map(({ title, keys }) => (
            <div key={title} style={{...S.card,marginTop:12}}>
              <div style={{fontSize:13,fontWeight:700,color:"#94a3b8",marginBottom:12,textTransform:"uppercase",letterSpacing:"0.05em"}}>{title}</div>
              {keys.map(k => {
                const meta = NUTRIENT_META[k];
                const computed = goals[k] ?? 0;
                const override = goalOverrides[k];
                const hasOverride = override != null;
                return (
                  <div key={k} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px 0",borderBottom:"1px solid #1e293b"}}>
                    <div style={{flex:1}}>
                      <div style={{fontSize:14,fontWeight:500,color:"#e2e8f0"}}>{meta.label}</div>
                      <div style={{fontSize:11,color:hasOverride?"#f59e0b":"#475569"}}>{meta.unit}{hasOverride&&" · override"}</div>
                    </div>
                    <div style={{display:"flex",alignItems:"center",gap:6}}>
                      {hasOverride && (
                        <button style={{background:"none",border:"1px solid #334155",color:"#475569",fontSize:11,cursor:"pointer",padding:"3px 7px",borderRadius:6}} onClick={() => setGoalOverrides(p => { const n={...p}; delete n[k]; return n; })}>↺ {computed}</button>
                      )}
                      <input
                        style={{...S.input,width:90,textAlign:"right",padding:"8px 12px",borderColor:hasOverride?"#f59e0b":"#1e293b"}}
                        type="number" inputMode="decimal"
                        placeholder={String(computed)}
                        value={hasOverride ? String(override) : ""}
                        onChange={e => {
                          const v = e.target.value;
                          if (v === "") setGoalOverrides(p => { const n={...p}; delete n[k]; return n; });
                          else setGoalOverrides(p => ({ ...p, [k]: parseFloat(v) || 0 }));
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
          {Object.keys(goalOverrides).length > 0 && (
            <button style={{width:"100%",padding:12,borderRadius:10,border:"1px solid #334155",background:"transparent",color:"#ef4444",fontSize:13,fontWeight:600,cursor:"pointer",marginTop:12,marginBottom:4}} onClick={() => setGoalOverrides({})}>Reset all overrides to computed values</button>
          )}
          <div style={{...S.card,marginTop:12}}>
            <div style={{fontSize:13,fontWeight:700,color:"#94a3b8",marginBottom:8,textTransform:"uppercase",letterSpacing:"0.05em"}}>Exercise Refuel Ratio</div>
            <div style={{fontSize:11,color:"#475569",marginBottom:12}}>How exercise calories are split across macros. Must sum to 100. Protein uses a dynamic 1×–2× multiplier instead.</div>
            {[{key:"carb",label:"Carbs (%)",color:NUTRIENT_META.carb.color},{key:"fat",label:"Fat (%)",color:NUTRIENT_META.fat.color},{key:"pro",label:"Protein (%)",color:NUTRIENT_META.pro.color}].map(({key,label,color})=>(<div key={key} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"8px 0",borderBottom:"1px solid #1e293b"}}><div style={{display:"flex",alignItems:"center",gap:8}}><div style={{width:10,height:10,borderRadius:2,background:color,flexShrink:0}}/><div style={{fontSize:14,fontWeight:500,color:"#e2e8f0"}}>{label}</div></div><input style={{...S.input,width:70,textAlign:"right",padding:"8px 12px"}} type="number" inputMode="numeric" value={exRatio[key]} onChange={e=>setExRatio(prev=>({...prev,[key]:parseInt(e.target.value)||0}))}/></div>))}
            {(()=>{const s=exRatio.carb+exRatio.fat+exRatio.pro,ok=s===100;return(<div style={{padding:"8px 0",fontSize:13,fontWeight:600,color:ok?"#10b981":"#ef4444",textAlign:"right"}}>Sum: {s} {ok?"✓":"needs to equal 100"}</div>);})()}
          </div>
        </div>
        <BottomNav/>
      </div>
    );
  }
  // ── EXPORT ────────────────────────────────────────────────────────────
  const handleExportData = () => {
    const exportedAt = new Date();
    const exportDateStr = dateKey(exportedAt);

    // ── Gather all days that have at least one non-exercise entry ──────
    // (exercise entries contribute to exercise_kcal column but we still
    //  include days that have only exercise + no food if exercise_kcal > 0)
    const allDayKeys = Object.keys(logs).filter(dk => (logs[dk]||[]).length > 0).sort();

    // ── Build per-day nutrient totals (food only, supplements separate) ─
    const csvRows = [];
    for (const dk of allDayKeys) {
      const dayEntries = logs[dk] || [];
      // Food nutrients (excludes supplements and exercise)
      const food = {}; NUTRIENT_ALL_KEYS.forEach(k => food[k] = 0);
      // Supplement nutrients — keyed by nutrient key
      const supp = {}; NUTRIENT_ALL_KEYS.forEach(k => supp[k] = 0);
      // Exercise kcal
      let exercise_kcal = 0;

      for (const e of dayEntries) {
        if (e.type === "exercise") {
          exercise_kcal += (e.calories_burned || 0);
          continue;
        }
        if (e.type === "supplement") {
          (e.items || []).forEach(item => {
            Object.keys(item.nutrients || {}).forEach(k => {
              if (NUTRIENT_ALL_KEYS.includes(k)) supp[k] += (item.nutrients[k] || 0);
            });
          });
          continue;
        }
        // food or recipe
        if (e.type === "recipe") {
          (e.derivedIngredients || []).forEach(ing => {
            const m = ing.amount_g / 100;
            if (ing.snapshot) { NUTRIENT_ALL_KEYS.forEach(k => { food[k] += (ing.snapshot[k] || 0) * m; }); }
            else { const f = allFoods.find(x => x.id === ing.foodId); if (!f) return; NUTRIENT_ALL_KEYS.forEach(k => { food[k] += (f[k] || 0) * m; }); }
          });
        } else {
          const m = (e.amount || 0) / 100;
          if (e.snapshot) { NUTRIENT_ALL_KEYS.forEach(k => { food[k] += (e.snapshot[k] || 0) * m; }); }
          else { const f = allFoods.find(x => x.id === e.foodId); if (!f) continue; NUTRIENT_ALL_KEYS.forEach(k => { food[k] += (f[k] || 0) * m; }); }
        }
      }

      // Only include the day if there is something logged
      const hasFood = NUTRIENT_ALL_KEYS.some(k => food[k] > 0);
      const hasSupp = NUTRIENT_ALL_KEYS.some(k => supp[k] > 0);
      if (!hasFood && !hasSupp && exercise_kcal === 0) continue;

      // Round helper — empty string for true zero (no entry vs logged zero)
      const fmt = v => v === 0 ? "" : String(Math.round(v * 1000) / 1000);

      csvRows.push({
        date:         dk,
        cal:          fmt(food.cal),
        protein_g:    fmt(food.pro),
        carbs_g:      fmt(food.carb),
        fat_g:        fmt(food.fat),
        fibre_g:      fmt(food.fib),
        iron_mg:      fmt(food.iron),
        calcium_mg:   fmt(food.calc),
        zinc_mg:      fmt(food.zinc),
        b12_mcg:      fmt(food.b12),
        vitD_mcg:     fmt(food.vitD),
        omega3_g:     fmt(food.omega3),
        iodine_mcg:   fmt(food.iod),
        selenium_mcg: fmt(food.sel),
        magnesium_mg: fmt(food.mag),
        potassium_mg: fmt(food.pot),
        folate_mcg:   fmt(food.fol),
        // Supplement columns — separate from food totals (council-mandated)
        supp_b12_mcg:   fmt(supp.b12),
        supp_vitD_mcg:  fmt(supp.vitD),
        supp_iron_mg:   fmt(supp.iron),
        supp_iodine_mcg:fmt(supp.iod),
        supp_omega3_g:  fmt(supp.omega3),
        // Additional supplement nutrients that the system can track
        supp_cal_kcal:  fmt(supp.cal),
        supp_protein_g: fmt(supp.pro),
        supp_zinc_mg:   fmt(supp.zinc),
        supp_calc_mg:   fmt(supp.calc),
        supp_mag_mg:    fmt(supp.mag),
        supp_pot_mg:    fmt(supp.pot),
        supp_fol_mcg:   fmt(supp.fol),
        supp_sel_mcg:   fmt(supp.sel),
        exercise_kcal:  fmt(exercise_kcal),
      });
    }

    // ── Build CSV string ───────────────────────────────────────────────
    const csvEscape = v => { const s = String(v); return s.includes(",") || s.includes('"') || s.includes('\n') ? `"${s.replace(/"/g, '""')}"` : s; };
    const csvHeaders = ["date","cal","protein_g","carbs_g","fat_g","fibre_g","iron_mg","calcium_mg","zinc_mg","b12_mcg","vitD_mcg","omega3_g","iodine_mcg","selenium_mcg","magnesium_mg","potassium_mg","folate_mcg","supp_b12_mcg","supp_vitD_mcg","supp_iron_mg","supp_iodine_mcg","supp_omega3_g","supp_cal_kcal","supp_protein_g","supp_zinc_mg","supp_calc_mg","supp_mag_mg","supp_pot_mg","supp_fol_mcg","supp_sel_mcg","exercise_kcal"];
    const csvBody = [csvHeaders.join(","), ...csvRows.map(row => csvHeaders.map(h => csvEscape(row[h] ?? "")).join(","))].join("\n");

    // ── Build JSON object ──────────────────────────────────────────────
    const jsonObj = {
      version: "1.0",
      exported_at: exportedAt.toISOString(),
      logs,
      recipes,
      customFoods,
      profile,
      exRatio,
      supplementStacks,
      notionStatus: { lastSyncedAt },
    };

    // ── Bundle both files into a single zip and trigger one download ───
    const zipFilename = `nutritrack-${exportDateStr}.zip`;
    const csvFilename  = `nutritrack-daily-${exportDateStr}.csv`;
    const jsonFilename = `nutritrack-full-${exportDateStr}.json`;

    const doZipDownload = (JSZip) => {
      const zip = new JSZip();
      zip.file(csvFilename,  csvBody);
      zip.file(jsonFilename, JSON.stringify(jsonObj, null, 2));
      zip.generateAsync({ type: "blob" }).then(blob => {
        const url = URL.createObjectURL(blob);
        const a   = document.createElement("a");
        a.href = url; a.download = zipFilename;
        document.body.appendChild(a); a.click();
        document.body.removeChild(a);
        setTimeout(() => URL.revokeObjectURL(url), 10000);
      });
    };

    // Load JSZip from cdnjs if not already present, then zip
    if (window.JSZip) {
      doZipDownload(window.JSZip);
    } else {
      const script = document.createElement("script");
      script.src = "https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js";
      script.onload = () => doZipDownload(window.JSZip);
      script.onerror = () => console.error("Failed to load JSZip");
      document.head.appendChild(script);
    }

    // ── Persist timestamp & show confirmation ──────────────────────────
    const isoNow = exportedAt.toISOString();
    setLastExportedAt(isoNow);
    saveData(STORAGE_KEYS.lastExportedAt, isoNow);

    const sortedDays = allDayKeys.filter(dk => csvRows.find(r => r.date === dk));
    setExportConfirm({
      zipFile:     zipFilename,
      csvFile:     csvFilename,
      jsonFile:    jsonFilename,
      csvRows:     csvRows.length,
      jsonEntries: Object.values(logs).flat().length,
      dateFrom:    sortedDays.length > 0 ? sortedDays[0] : null,
      dateTo:      sortedDays.length > 0 ? sortedDays[sortedDays.length - 1] : null,
    });
  };

  // ── SETTINGS ──────────────────────────────────────────────────────────
  if (view === "settings") {
    const formatSyncTime = iso => { if(!iso)return"Never"; const d=new Date(iso); return d.toLocaleDateString("en-GB",{day:"numeric",month:"short"})+" at "+d.toLocaleTimeString("en-GB",{hour:"2-digit",minute:"2-digit"}); };
    return (
      <div style={S.app}>
        <div style={S.header}><span style={{fontSize:17,fontWeight:700}}>Settings</span></div>
        <div style={S.section}>

          {/* Profile */}
          <div style={{fontSize:13,fontWeight:700,color:"#94a3b8",textTransform:"uppercase",letterSpacing:"0.05em",marginBottom:10,marginTop:4}}>Profile</div>
          <div style={S.card}>
            <div style={{fontSize:12,color:"#64748b",marginBottom:16}}>Used to personalise exercise calorie burn estimates.</div>
            <label style={S.label}>Name</label><input style={{...S.input,marginBottom:16}} placeholder="e.g. Nick" value={profile.name} onChange={e=>setProfile(p=>({...p,name:e.target.value}))}/>
            <label style={S.label}>Weight (kg)</label><input style={{...S.input,marginBottom:16}} type="number" inputMode="decimal" placeholder="e.g. 75" value={profile.weightKg} onChange={e=>setProfile(p=>({...p,weightKg:e.target.value}))}/>
            <label style={S.label}>Height (cm)</label><input style={{...S.input,marginBottom:16}} type="number" inputMode="decimal" placeholder="e.g. 175" value={profile.heightCm||""} onChange={e=>setProfile(p=>({...p,heightCm:e.target.value}))}/>
            <label style={S.label}>Age</label><input style={{...S.input,marginBottom:16}} type="number" inputMode="numeric" placeholder="e.g. 30" value={profile.age} onChange={e=>setProfile(p=>({...p,age:e.target.value}))}/>
            <label style={S.label}>Sex</label>
            <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>{["Male","Female","Other","Prefer not to say"].map(opt=>(<button key={opt} style={S.pill(profile.sex===opt)} onClick={()=>setProfile(p=>({...p,sex:opt}))}>{opt}</button>))}</div>
          </div>
          {(profile.name||profile.weightKg)&&(<div style={{...S.card,background:"#0f172a"}}><div style={{fontSize:13,fontWeight:700,color:"#94a3b8",marginBottom:10,textTransform:"uppercase",letterSpacing:"0.05em"}}>Summary</div>{profile.name&&<div style={{fontSize:14,color:"#e2e8f0",marginBottom:4}}>👤 {profile.name}</div>}{profile.weightKg&&<div style={{fontSize:14,color:"#e2e8f0",marginBottom:4}}>⚖️ {profile.weightKg} kg</div>}{profile.heightCm&&<div style={{fontSize:14,color:"#e2e8f0",marginBottom:4}}>📏 {profile.heightCm} cm</div>}{profile.age&&<div style={{fontSize:14,color:"#e2e8f0",marginBottom:4}}>🎂 {profile.age} years old</div>}{profile.sex&&<div style={{fontSize:14,color:"#e2e8f0",marginBottom:4}}>⚧ {profile.sex}</div>}{(!profile.weightKg||!profile.heightCm)&&<div style={{fontSize:12,color:"#f59e0b",marginTop:6}}>⚠️ Add weight and height to enable accurate goal computation</div>}</div>)}

          {/* Supplements */}
          <div style={{fontSize:13,fontWeight:700,color:"#94a3b8",textTransform:"uppercase",letterSpacing:"0.05em",marginBottom:10,marginTop:16}}>Supplements</div>
          <div style={S.card}>
            <div style={{fontSize:12,color:"#64748b",marginBottom:12}}>Define supplement stacks to log quickly. Nutrient contributions are added to daily totals.</div>
            {supplementStacks.map(stack=>(
              <div key={stack.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 0",borderBottom:"1px solid #1e293b",cursor:"pointer"}} onClick={()=>openStackEditor(stack)}>
                <div><div style={{fontSize:14,fontWeight:600,color:"#c4b5fd"}}>💊 {stack.name}</div><div style={{fontSize:12,color:"#64748b",marginTop:2}}>{stack.items.length===0?"Empty — tap to add items":`${stack.items.length} item${stack.items.length===1?"":"s"}`}</div></div>
                <div style={{color:"#475569",fontSize:16}}>›</div>
              </div>
            ))}
            <button style={{width:"100%",marginTop:12,padding:10,borderRadius:10,border:"1px dashed #334155",background:"transparent",color:"#94a3b8",fontSize:13,fontWeight:600,cursor:"pointer"}} onClick={()=>openStackEditor(null)}>+ Add stack</button>
          </div>

          {/* Notion Sync */}
          <div style={{fontSize:13,fontWeight:700,color:"#94a3b8",textTransform:"uppercase",letterSpacing:"0.05em",marginBottom:10,marginTop:16}}>Notion Recipe Import</div>
          <div style={S.card}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",paddingBottom:12,marginBottom:12,borderBottom:"1px solid #1e293b"}}><span style={{fontSize:13,color:"#94a3b8"}}>Last synced</span><span style={{fontSize:13,color:lastSyncedAt?"#10b981":"#475569",fontWeight:600}}>{formatSyncTime(lastSyncedAt)}</span></div>
            {syncQueue.length>0&&(<div style={{background:"#1c1a00",border:"1px solid #854d0e",borderRadius:10,padding:"10px 14px",marginBottom:12,display:"flex",justifyContent:"space-between",alignItems:"center"}}><div><div style={{fontSize:13,color:"#fbbf24",fontWeight:600}}>⏳ {syncQueue.length} {syncQueue.length===1?"request":"requests"} queued</div><div style={{fontSize:11,color:"#78716c",marginTop:2}}>Will process when back online</div></div><button style={{background:"none",border:"1px solid #854d0e",borderRadius:8,color:"#f59e0b",fontSize:11,fontWeight:600,padding:"4px 10px",cursor:"pointer"}} onClick={clearSyncQueue}>Clear</button></div>)}
            {notionSyncMsg&&(<div style={{background:notionSyncMsg.type==="error"?"#2d0f0f":"#0f1f2d",border:`1px solid ${notionSyncMsg.type==="error"?"#7f1d1d":"#1d4ed8"}`,borderRadius:10,padding:"10px 14px",marginBottom:12,fontSize:13,color:notionSyncMsg.type==="error"?"#fca5a5":"#93c5fd"}}>{notionSyncMsg.text}</div>)}
            {syncProgress&&(<div style={{background:"#0f1f2d",border:"1px solid #1d4ed8",borderRadius:10,padding:"12px 14px",marginBottom:12}}><div style={{fontSize:13,color:"#93c5fd",fontWeight:600,marginBottom:6}}>{syncProgress.phase==="connecting"&&"Connecting to Notion…"}{syncProgress.phase==="listing"&&"Looking for new and changed recipes…"}{syncProgress.phase==="fetching"&&`Fetching ${syncProgress.current} of ${syncProgress.total} recipes…`}{syncProgress.phase==="parsing"&&`Parsing ingredients (${syncProgress.current} of ${syncProgress.total})…`}</div>{syncProgress.total>0&&(<div style={{height:6,borderRadius:3,background:"#1e293b",overflow:"hidden"}}><div style={{height:"100%",background:"#3b82f6",borderRadius:3,width:`${Math.round((syncProgress.current/Math.max(syncProgress.total,1))*100)}%`,transition:"width 0.3s ease"}}/></div>)}</div>)}
            <button style={{width:"100%",padding:14,borderRadius:12,border:"none",background:syncInProgress?"#1e293b":"#7c3aed",color:syncInProgress?"#64748b":"#fff",fontSize:15,fontWeight:700,cursor:syncInProgress?"default":"pointer",marginBottom:8}} disabled={syncInProgress} onClick={handleWorkerSync}>{syncInProgress?"Syncing…":(lastSyncedAt?"Sync new and changed recipes":"Sync all recipes from Notion")}</button>
            <div style={{display:"flex",gap:8,marginBottom:14}}>
              <button style={{flex:1,padding:"10px 12px",borderRadius:10,border:"1px solid #334155",background:"transparent",color:syncInProgress?"#475569":"#94a3b8",fontSize:12,fontWeight:600,cursor:syncInProgress?"default":"pointer"}} disabled={syncInProgress} onClick={handleTestConnection}>Test connection</button>
              {lastSyncedAt&&(<button style={{flex:1,padding:"10px 12px",borderRadius:10,border:"1px solid #334155",background:"transparent",color:syncInProgress?"#475569":"#94a3b8",fontSize:12,fontWeight:600,cursor:syncInProgress?"default":"pointer"}} disabled={syncInProgress} onClick={handleResetSyncHistory}>Reset sync history</button>)}
            </div>
            <details style={{marginTop:6}}>
              <summary style={{fontSize:12,color:"#64748b",cursor:"pointer",padding:"8px 0",listStyle:"none",outline:"none",userSelect:"none"}}>▸ Manual import (fallback)</summary>
              <div style={{marginTop:8}}><div style={{fontSize:11,color:"#64748b",marginBottom:8,lineHeight:1.5}}>Paste ingredient text from any source.</div>
                <textarea style={{width:"100%",background:"#1e293b",border:"1px solid #334155",borderRadius:10,padding:"12px 14px",color:"#e2e8f0",fontSize:13,outline:"none",boxSizing:"border-box",minHeight:100,resize:"vertical",fontFamily:"inherit"}} placeholder={"e.g.\n50 g of flour\n1 tsp cornstarch"} value={pasteText} onChange={e=>setPasteText(e.target.value)}/>
                <button style={{width:"100%",marginTop:8,padding:12,borderRadius:10,border:"1px solid #334155",background:pasteText.trim()&&!syncInProgress?"transparent":"#0f1729",color:pasteText.trim()&&!syncInProgress?"#94a3b8":"#475569",fontSize:13,fontWeight:600,cursor:pasteText.trim()&&!syncInProgress?"pointer":"default"}} disabled={!pasteText.trim()||syncInProgress} onClick={handlePasteSync}>{syncInProgress?"Working…":"Parse pasted text"}</button>
              </div>
            </details>
            <details style={{marginTop:6}}>
              <summary style={{fontSize:12,color:"#64748b",cursor:"pointer",padding:"8px 0",listStyle:"none",outline:"none",userSelect:"none"}}>▸ Test regex parser (dev)</summary>
              <div style={{marginTop:8}}><div style={{fontSize:11,color:"#64748b",marginBottom:8,lineHeight:1.5}}>Paste raw ingredient lines (one per line). Runs only the regex parser.</div>
                <textarea style={{width:"100%",background:"#1e293b",border:"1px solid #334155",borderRadius:10,padding:"12px 14px",color:"#e2e8f0",fontSize:13,outline:"none",boxSizing:"border-box",minHeight:100,resize:"vertical",fontFamily:"inherit"}} placeholder={"200g cherry tomatoes\n1 capsicum\n2 medium onions"} value={parserTestText} onChange={e=>setParserTestText(e.target.value)}/>
                <button style={{width:"100%",marginTop:8,padding:12,borderRadius:10,border:"1px solid #334155",background:parserTestText.trim()&&!syncInProgress?"transparent":"#0f1729",color:parserTestText.trim()&&!syncInProgress?"#94a3b8":"#475569",fontSize:13,fontWeight:600,cursor:parserTestText.trim()&&!syncInProgress?"pointer":"default"}} disabled={!parserTestText.trim()||syncInProgress} onClick={handleParserTest}>{syncInProgress?"Working…":"Run parser"}</button>
              </div>
            </details>
            <div style={{fontSize:11,color:"#334155",textAlign:"center",marginTop:14}}>{recipes.length} {recipes.length===1?"recipe":"recipes"} stored locally</div>
          </div>

          {/* Export Data */}
          <div style={{fontSize:13,fontWeight:700,color:"#94a3b8",textTransform:"uppercase",letterSpacing:"0.05em",marginBottom:10,marginTop:16}}>Export Data</div>
          <div style={S.card}>
            <div style={{fontSize:12,color:"#64748b",marginBottom:14,lineHeight:1.5}}>Exports all logs, recipes, and profile data as a CSV (daily totals, doctor-readable) and JSON (full log, re-importable) to the Files app.</div>
            <button style={{width:"100%",padding:14,borderRadius:12,border:"none",background:"#0f766e",color:"#fff",fontSize:15,fontWeight:700,cursor:"pointer",marginBottom:10}} onClick={handleExportData}>Export Data</button>
            <div style={{fontSize:12,color:"#475569",textAlign:"center"}}>Last exported: <span style={{color:lastExportedAt?"#10b981":"#64748b",fontWeight:600}}>{lastExportedAt ? (() => { const d=new Date(lastExportedAt); return d.toLocaleDateString("en-GB",{day:"numeric",month:"short",year:"numeric"})+" at "+d.toLocaleTimeString("en-GB",{hour:"2-digit",minute:"2-digit"}); })() : "Never"}</span></div>
            {exportConfirm && (
              <div style={{marginTop:14,background:"#0a1a14",border:"1px solid #065f46",borderRadius:10,padding:"12px 14px"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
                  <div style={{fontSize:13,fontWeight:700,color:"#34d399"}}>✓ Export complete</div>
                  <button style={{background:"none",border:"none",color:"#475569",fontSize:16,cursor:"pointer",padding:"0 4px",lineHeight:1}} onClick={() => setExportConfirm(null)}>×</button>
                </div>
                <div style={{fontSize:12,color:"#6ee7b7",marginBottom:4}}>🗜 {exportConfirm.zipFile}</div>
                <div style={{fontSize:11,color:"#475569",marginBottom:10}}>Contains: {exportConfirm.csvFile} + {exportConfirm.jsonFile}</div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"4px 12px"}}>
                  <div style={{fontSize:11,color:"#94a3b8"}}>Date range</div>
                  <div style={{fontSize:11,color:"#e2e8f0",fontWeight:600}}>{exportConfirm.dateFrom ? `${exportConfirm.dateFrom} → ${exportConfirm.dateTo}` : "No days logged"}</div>
                  <div style={{fontSize:11,color:"#94a3b8"}}>CSV rows</div>
                  <div style={{fontSize:11,color:"#e2e8f0",fontWeight:600}}>{exportConfirm.csvRows} day{exportConfirm.csvRows===1?"":"s"}</div>
                  <div style={{fontSize:11,color:"#94a3b8"}}>JSON entries</div>
                  <div style={{fontSize:11,color:"#e2e8f0",fontWeight:600}}>{exportConfirm.jsonEntries} log{exportConfirm.jsonEntries===1?"":"s"}</div>
                </div>
              </div>
            )}
          </div>

        </div>
        <BottomNav/>
      </div>
    );
  }
  // ── NOTION REVIEW ─────────────────────────────────────────────────────
  if (view === "notionReview") {
    const allResolved=syncReviewData.every(r=>r.duplicateAction!==null);
    const readyCount=syncReviewData.filter(r=>!r.imported&&r.duplicateAction!==null&&r.duplicateAction!=="skip").length;
    return (
      <div style={S.app}>
        <div style={S.header}><button style={{background:"none",border:"none",color:"#94a3b8",fontSize:15,cursor:"pointer"}} onClick={()=>{setView("settings");setSyncReviewData([]);}}>← Back</button><span style={{fontSize:15,fontWeight:700}}>Review Import</span><button style={{background:"none",border:"none",fontSize:13,fontWeight:700,cursor:allResolved&&readyCount>0?"pointer":"default",color:allResolved&&readyCount>0?"#7c3aed":"#334155"}} disabled={!allResolved||readyCount===0} onClick={importAllReady}>Import All ({readyCount})</button></div>
        <div style={{...S.section,paddingBottom:40}}>
          {syncReviewData.length===0&&(<div style={{textAlign:"center",padding:"40px 0",color:"#475569"}}>No recipes to review.</div>)}
          {syncReviewData.map((r,rIdx)=>{
            const skippedCount=r.ingredients.filter(i=>i.skipped).length, matchedCount=r.ingredients.filter(i=>i.match&&!i.skipped).length;
            return (<div key={rIdx} style={{...S.card,marginBottom:12,opacity:r.imported?0.5:1}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8}}><div style={{flex:1}}><div style={{fontSize:15,fontWeight:700,color:r.imported?"#10b981":"#e2e8f0"}}>{r.imported&&"✓ "}{r.title}</div><div style={{fontSize:12,color:"#475569",marginTop:2}}>{r.servings} serving{r.servings===1?"":"s"}{r.source?` · ${r.source}`:""}</div></div></div>
              {r.existingId&&!r.imported&&(<div style={{background:"#1c1200",border:"1px solid #92400e",borderRadius:10,padding:"10px 12px",marginBottom:10}}><div style={{fontSize:12,color:"#fbbf24",fontWeight:600,marginBottom:8}}>⚠️ "{r.title}" already exists locally.</div><div style={{display:"flex",gap:6,flexWrap:"wrap"}}>{[["overwrite","Overwrite"],["copy","Save as copy"],["skip","Skip"]].map(([action,label])=>(<button key={action} style={{...S.pill(r.duplicateAction===action),background:r.duplicateAction===action?(action==="skip"?"#7f1d1d":action==="overwrite"?"#1d4ed8":"#14532d"):"transparent",borderColor:r.duplicateAction===action?(action==="skip"?"#ef4444":action==="overwrite"?"#3b82f6":"#22c55e"):"#334155",color:r.duplicateAction===action?"#fff":"#94a3b8"}} onClick={()=>setSyncReviewData(prev=>prev.map((item,i)=>i===rIdx?{...item,duplicateAction:action}:item))}>{label}</button>))}</div></div>)}
              <div style={{marginBottom:r.imported?0:10}}><div style={{fontSize:11,fontWeight:700,color:"#475569",marginBottom:6,textTransform:"uppercase",letterSpacing:"0.04em"}}>Ingredients — {matchedCount} matched{skippedCount>0?`, ${skippedCount} skipped`:""}</div>
                {r.ingredients.map((ing,iIdx)=>(<div key={iIdx} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"6px 0",borderBottom:iIdx<r.ingredients.length-1?"1px solid #1e293b":"none"}}><div style={{flex:1}}>{ing.match&&!ing.skipped?(<div style={{fontSize:13,color:"#4ade80"}}>✓ {ing.match.name}</div>):ing.skipped&&!ing.match?(<div style={{fontSize:13,color:"#64748b"}}>⊘ {ing.name} <span style={{fontSize:11}}>(no match)</span></div>):ing.skipped?(<div style={{fontSize:13,color:"#64748b",textDecoration:"line-through"}}>{ing.match?.name||ing.name}</div>):(<div style={{fontSize:13,color:"#fbbf24"}}>⚠ {ing.name}</div>)}<div style={{fontSize:11,color:"#475569"}}>{ing.amount_g}g</div></div>
                  <div style={{display:"flex",gap:6,alignItems:"center"}}>
                    {!r.imported&&!ing.skipped&&!ing.match&&(<button style={{background:"#1d2d3a",border:"1px solid #334155",borderRadius:8,color:"#93c5fd",fontSize:11,fontWeight:600,padding:"3px 8px",cursor:"pointer"}} onClick={()=>{setNotionIngPick({recipeIdx:rIdx,ingIdx:iIdx});setNotionIngSearch("");setView("notionIngPick");}}>Pick</button>)}
                    {!r.imported&&(<button style={{background:"none",border:"none",color:ing.skipped?"#475569":"#64748b",fontSize:11,cursor:"pointer",padding:"2px 4px"}} onClick={()=>setSyncReviewData(prev=>prev.map((item,ri)=>ri!==rIdx?item:{...item,ingredients:item.ingredients.map((x,ii)=>ii!==iIdx?x:{...x,skipped:!x.skipped})}))}>
                      {ing.skipped?"Restore":"Skip"}</button>)}
                  </div>
                </div>))}
              </div>
              {!r.imported&&r.duplicateAction!==null&&r.duplicateAction!=="skip"&&(<button style={{width:"100%",padding:10,borderRadius:10,border:"none",background:matchedCount>0?"#7c3aed":"#1e293b",color:matchedCount>0?"#fff":"#64748b",fontSize:13,fontWeight:700,cursor:matchedCount>0?"pointer":"default"}} disabled={matchedCount===0} onClick={()=>importRecipe(rIdx)}>Import "{r.title}"</button>)}
              {r.imported&&<div style={{textAlign:"center",fontSize:13,color:"#10b981",fontWeight:600}}>✓ Imported</div>}
              {r.duplicateAction==="skip"&&<div style={{textAlign:"center",fontSize:13,color:"#475569"}}>Skipped</div>}
            </div>);
          })}
          {syncReviewData.some(r=>r.imported)&&(<button style={{width:"100%",padding:14,borderRadius:12,border:"none",background:"#7c3aed",color:"#fff",fontSize:15,fontWeight:700,cursor:"pointer",marginTop:4}} onClick={importAllReady}>Done — Save & Finish</button>)}
        </div>
        <BottomNav/>
      </div>
    );
  }

  // ── NOTION INGREDIENT PICKER ──────────────────────────────────────────
  if (view === "notionIngPick" && notionIngPick) {
    const filteredNotionFoods=notionIngSearch.length>0?allFoods.filter(f=>f.name.toLowerCase().includes(notionIngSearch.toLowerCase())):allFoods;
    const groupedNotionFoods=filteredNotionFoods.reduce((acc,f)=>{if(!acc[f.cat])acc[f.cat]=[];acc[f.cat].push(f);return acc;},{});
    const currentIng=syncReviewData[notionIngPick.recipeIdx]?.ingredients[notionIngPick.ingIdx];
    return (
      <div style={S.app}>
        <div style={S.header}><button style={{background:"none",border:"none",color:"#94a3b8",fontSize:15,cursor:"pointer"}} onClick={()=>{setNotionIngPick(null);setView("notionReview");}}>← Back</button><span style={{fontSize:15,fontWeight:700}}>Match Ingredient</span><div style={{width:48}}/></div>
        <div style={S.section}>
          {currentIng&&(<div style={{background:"#1c1200",border:"1px solid #92400e",borderRadius:10,padding:"10px 14px",marginBottom:12,fontSize:13,color:"#fbbf24"}}>Matching: <strong>{currentIng.name}</strong> ({currentIng.amount_g}g)</div>)}
          <input style={{...S.input,marginBottom:12}} placeholder="Search foods…" value={notionIngSearch} onChange={e=>setNotionIngSearch(e.target.value)} autoFocus/>
          <div style={{maxHeight:"calc(100vh - 220px)",overflowY:"auto"}}>
            {Object.entries(groupedNotionFoods).map(([cat,foods])=>(<div key={cat}><div style={{fontSize:11,fontWeight:700,color:"#475569",padding:"10px 0 4px",letterSpacing:"0.05em",textTransform:"uppercase"}}>{cat}</div>{foods.map(f=>(<div key={f.id} style={S.srchItem} onClick={()=>{setSyncReviewData(prev=>prev.map((item,ri)=>ri!==notionIngPick.recipeIdx?item:{...item,ingredients:item.ingredients.map((ing,ii)=>ii!==notionIngPick.ingIdx?ing:{...ing,match:f,skipped:false})}));setNotionIngPick(null);setView("notionReview");}}><span style={{fontSize:12,color:"#f59e0b",float:"right"}}>{f.cal} kcal/100g</span><div style={{fontSize:14,fontWeight:500,color:"#e2e8f0"}}>{f.name}</div></div>))}</div>))}
            {filteredNotionFoods.length===0&&(<div style={{padding:20,textAlign:"center",color:"#475569",fontSize:14}}>No foods found for "{notionIngSearch}"</div>)}
          </div>
        </div>
      </div>
    );
  }
  // ── DETAIL VIEWS ──────────────────────────────────────────────────────
  if (view === "proDetail") {
    const aaTotals={}; AA_KEYS.forEach(k=>{aaTotals[k]=0;});
    dayLog.forEach(e=>{if(e.type==="exercise"||e.type==="supplement")return;if(e.type==="recipe"){(e.derivedIngredients||[]).forEach(ing=>{const m=ing.amount_g/100;if(ing.snapshot){AA_KEYS.forEach(k=>{aaTotals[k]+=(ing.snapshot[k]||0)*m;});}else{const f=allFoods.find(x=>x.id===ing.foodId);if(!f)return;AA_KEYS.forEach(k=>{aaTotals[k]+=(f[k]||0)*m;});}});return;}const m=e.amount/100;if(e.snapshot){AA_KEYS.forEach(k=>{aaTotals[k]+=(e.snapshot[k]||0)*m;});}else{const f=allFoods.find(x=>x.id===e.foodId);if(!f)return;AA_KEYS.forEach(k=>{aaTotals[k]+=(f[k]||0)*m;});}});
    const aaGoals = computeAAGoals(profile.weightKg);
    // Apply same exercise multiplier as protein goal
    const scaledAAGoals = Object.fromEntries(Object.entries(aaGoals).map(([k,v]) => [k, v * proMultiplier]));
    let limitingKey="aaLys",lowestPct=Infinity; AA_KEYS.forEach(k=>{const p=(aaTotals[k]/scaledAAGoals[k])*100;if(p<lowestPct){lowestPct=p;limitingKey=k;}});
    const proCont=dayLog.flatMap(e=>{if(e.type==="exercise")return[];if(e.type==="supplement"){const v=suppContrib(e,"pro");return v>0?[{name:`💊 ${e.stackName}`,label:"supplement",value:v,isSupp:true}]:[]; }if(e.type==="recipe"){const n=computeEntryNutrition(e.derivedIngredients||[],allFoods);return n.pro?[{name:`📖 ${e.recipeName}`,label:`${e.servings} srv`,value:n.pro}]:[];}const val=e.snapshot?(e.snapshot.pro||0)*e.amount/100:(allFoods.find(x=>x.id===e.foodId)?.pro||0)*e.amount/100;return val?[{name:e.foodName,label:`${e.amount}g`,value:val}]:[];}).sort((a,b)=>b.value-a.value);
    return (
      <div style={S.app}>
        <div style={S.header}><button style={{background:"none",border:"none",color:"#94a3b8",fontSize:15,cursor:"pointer"}} onClick={()=>setView("log")}>← Back</button><span style={{fontSize:15,fontWeight:700}}>Protein</span><div style={{width:48}}/></div>
        <div style={S.section}>
          <div style={{...S.card,textAlign:"center"}}><Ring value={totals.pro} max={effectiveGoals.pro} size={100} stroke={8} color={NUTRIENT_META.pro.color}><text x="50%" y="45%" textAnchor="middle" fill="#e2e8f0" fontSize={18} fontWeight={700}>{Math.round(totals.pro*10)/10}</text><text x="50%" y="62%" textAnchor="middle" fill="#64748b" fontSize={10}>/ {effectiveGoals.pro}g</text></Ring><div style={{marginTop:12,fontSize:14,color:pct("pro")>=100?"#10b981":pct("pro")>=60?"#f59e0b":"#ef4444"}}>{pct("pro")}% of daily goal</div></div>
          <div style={S.card}><div style={{fontSize:13,fontWeight:700,color:"#94a3b8",marginBottom:4,textTransform:"uppercase",letterSpacing:"0.05em"}}>Essential Amino Acids</div><div style={{fontSize:11,color:"#475569",marginBottom:14}}>targets for {parseFloat(profile.weightKg)||70}kg{proMultiplier>1&&<span style={{color:"#4ade80"}}> · {proMultiplier.toFixed(2)}× exercise scaling</span>}</div>
            {AA_KEYS.map(k=>{const val=aaTotals[k],ear=scaledAAGoals[k],bp=Math.min((val/ear)*100,100),rp=Math.round((val/ear)*100),isLimit=k===limitingKey,col=rp>=100?"#10b981":rp>=60?"#3B82F6":rp>=30?"#f59e0b":"#ef4444";return(<div key={k} style={{marginBottom:10}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}><div style={{display:"flex",alignItems:"center",gap:6}}><span style={{fontSize:13,color:"#e2e8f0",fontWeight:isLimit?700:400}}>{AA_LABELS[k]}</span>{isLimit&&<span style={{fontSize:9,fontWeight:700,color:"#f59e0b",background:"rgba(245,158,11,0.15)",borderRadius:4,padding:"1px 5px"}}>LIMITING</span>}</div><div style={{textAlign:"right"}}><span style={{fontSize:12,fontWeight:600,color:col}}>{rp}%</span><span style={{fontSize:10,color:"#475569",marginLeft:5}}>{Math.round(val*100)/100}g / {Math.round(ear*100)/100}g</span></div></div><div style={{height:6,borderRadius:3,background:"#1e293b",overflow:"hidden"}}><div style={{height:"100%",width:`${bp}%`,background:col,borderRadius:3,transition:"width 0.5s ease"}}/></div></div>);})}
          </div>
          {proCont.length>0&&(<div style={S.card}><div style={{fontSize:13,fontWeight:700,color:"#94a3b8",marginBottom:10,textTransform:"uppercase",letterSpacing:"0.05em"}}>Today's Sources</div>{proCont.map((c,i)=>(<div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"7px 0",borderBottom:i<proCont.length-1?"1px solid #1e293b":"none",background:c.isSupp?"rgba(167,139,250,0.05)":"transparent",borderRadius:c.isSupp?6:0}}><div><div style={{fontSize:13,color:c.isSupp?"#c4b5fd":"#e2e8f0"}}>{c.name}</div><div style={{fontSize:11,color:"#64748b"}}>{c.label}</div></div><div style={{fontSize:13,fontWeight:600,color:NUTRIENT_META.pro.color}}>{Math.round(c.value*10)/10}g</div></div>))}</div>)}
        </div>
      </div>
    );
  }

  if (view === "calDetail") {
    const proK=totals.pro*4,carbK=totals.carb*4,fatK=totals.fat*9,totK=proK+carbK+fatK;
    const calCont=dayLog.flatMap(e=>{if(e.type==="exercise")return[];if(e.type==="supplement"){const v=suppContrib(e,"cal");return v>0?[{name:`💊 ${e.stackName}`,label:"supplement",value:v,isSupp:true}]:[]; }if(e.type==="recipe"){const n=computeEntryNutrition(e.derivedIngredients||[],allFoods);return n.cal?[{name:`📖 ${e.recipeName}`,label:`${e.servings} srv`,value:n.cal}]:[];}const val=e.snapshot?(e.snapshot.cal||0)*e.amount/100:(allFoods.find(x=>x.id===e.foodId)?.cal||0)*e.amount/100;return val?[{name:e.foodName,label:`${e.amount}g`,value:val}]:[];}).sort((a,b)=>b.value-a.value);
    return (
      <div style={S.app}>
        <div style={S.header}><button style={{background:"none",border:"none",color:"#94a3b8",fontSize:15,cursor:"pointer"}} onClick={()=>setView("log")}>← Back</button><span style={{fontSize:15,fontWeight:700}}>Calories</span><div style={{width:48}}/></div>
        <div style={S.section}>
          <div style={{...S.card,textAlign:"center"}}><Ring value={totals.cal} max={effectiveGoals.cal} size={100} stroke={8} color={NUTRIENT_META.cal.color}><text x="50%" y="45%" textAnchor="middle" fill="#e2e8f0" fontSize={18} fontWeight={700}>{Math.round(totals.cal)}</text><text x="50%" y="62%" textAnchor="middle" fill="#64748b" fontSize={10}>/ {effectiveGoals.cal} kcal</text></Ring><div style={{marginTop:12,fontSize:14,color:pct("cal")>=100?"#10b981":pct("cal")>=60?"#f59e0b":"#ef4444"}}>{pct("cal")}% of daily goal</div></div>
          <div style={S.card}><div style={{fontSize:13,fontWeight:700,color:"#94a3b8",marginBottom:12,textTransform:"uppercase",letterSpacing:"0.05em"}}>Calorie Breakdown</div>
            {totK>0?(<div style={{display:"flex",height:14,borderRadius:7,overflow:"hidden",marginBottom:16,gap:1}}><div style={{width:`${(proK/totK)*100}%`,background:NUTRIENT_META.pro.color}}/><div style={{width:`${(carbK/totK)*100}%`,background:NUTRIENT_META.carb.color}}/><div style={{width:`${(fatK/totK)*100}%`,background:NUTRIENT_META.fat.color}}/></div>):<div style={{height:14,borderRadius:7,background:"#1e293b",marginBottom:16}}/>}
            {[{key:"pro",label:"Protein",kcal:proK,grams:totals.pro,mult:"×4"},{key:"carb",label:"Carbs",kcal:carbK,grams:totals.carb,mult:"×4"},{key:"fat",label:"Fat",kcal:fatK,grams:totals.fat,mult:"×9"}].map(({key,label,kcal,grams,mult},i)=>(<div key={key} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 0",borderBottom:i<2?"1px solid #1e293b":"none"}}><div style={{display:"flex",alignItems:"center",gap:10}}><div style={{width:12,height:12,borderRadius:3,background:NUTRIENT_META[key].color,flexShrink:0}}/><div><div style={{fontSize:14,color:"#e2e8f0",fontWeight:500}}>{label}</div><div style={{fontSize:11,color:"#64748b"}}>{Math.round(grams*10)/10}g {mult}</div></div></div><div style={{textAlign:"right"}}><div style={{fontSize:15,fontWeight:700,color:NUTRIENT_META[key].color}}>{Math.round(kcal)} kcal</div><div style={{fontSize:11,color:"#64748b"}}>{totK>0?Math.round((kcal/totK)*100):0}%</div></div></div>))}
          </div>
          {calCont.length>0&&(<div style={S.card}><div style={{fontSize:13,fontWeight:700,color:"#94a3b8",marginBottom:10,textTransform:"uppercase",letterSpacing:"0.05em"}}>Today's Sources</div>{calCont.map((c,i)=>(<div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"7px 0",borderBottom:i<calCont.length-1?"1px solid #1e293b":"none",background:c.isSupp?"rgba(167,139,250,0.05)":"transparent",borderRadius:c.isSupp?6:0}}><div><div style={{fontSize:13,color:c.isSupp?"#c4b5fd":"#e2e8f0"}}>{c.name}</div><div style={{fontSize:11,color:"#64748b"}}>{c.label}</div></div><div style={{fontSize:13,fontWeight:600,color:NUTRIENT_META.cal.color}}>{Math.round(c.value)} kcal</div></div>))}</div>)}
        </div>
      </div>
    );
  }

  if (view === "fibDetail") {
    const fibSol=dayLog.reduce((s,e)=>{if(e.type==="exercise"||e.type==="supplement")return s;if(e.type==="recipe")return s+recipeSubtotal(e,"fibSol");if(e.snapshot)return s+(e.snapshot.fibSol||0)*e.amount/100;const f=allFoods.find(x=>x.id===e.foodId);return s+(f?(f.fibSol||0)*e.amount/100:0);},0);
    const fibInsol=dayLog.reduce((s,e)=>{if(e.type==="exercise"||e.type==="supplement")return s;if(e.type==="recipe")return s+recipeSubtotal(e,"fibInsol");if(e.snapshot)return s+(e.snapshot.fibInsol||0)*e.amount/100;const f=allFoods.find(x=>x.id===e.foodId);return s+(f?(f.fibInsol||0)*e.amount/100:0);},0);
    const fibT=fibSol+fibInsol;
    const fibCont=dayLog.flatMap(e=>{if(e.type==="exercise"||e.type==="supplement")return[];if(e.type==="recipe"){const n=computeEntryNutrition(e.derivedIngredients||[],allFoods);if(!n.fib)return[];return[{name:`📖 ${e.recipeName}`,label:`${e.servings} srv`,total:n.fib,sol:recipeSubtotal(e,"fibSol"),insol:recipeSubtotal(e,"fibInsol")}];}if(e.snapshot){const t=(e.snapshot.fib||0)*e.amount/100;if(!t)return[];return[{name:e.foodName,label:`${e.amount}g`,total:t,sol:(e.snapshot.fibSol||0)*e.amount/100,insol:(e.snapshot.fibInsol||0)*e.amount/100}];}const f=allFoods.find(x=>x.id===e.foodId);if(!f||!f.fib)return[];return[{name:e.foodName,label:`${e.amount}g`,total:f.fib*e.amount/100,sol:(f.fibSol||0)*e.amount/100,insol:(f.fibInsol||0)*e.amount/100}];}).sort((a,b)=>b.total-a.total);
    return (
      <div style={S.app}>
        <div style={S.header}><button style={{background:"none",border:"none",color:"#94a3b8",fontSize:15,cursor:"pointer"}} onClick={()=>setView("log")}>← Back</button><span style={{fontSize:15,fontWeight:700}}>Fibre</span><div style={{width:48}}/></div>
        <div style={S.section}>
          <div style={{...S.card,textAlign:"center"}}><Ring value={totals.fib} max={effectiveGoals.fib} size={100} stroke={8} color={NUTRIENT_META.fib.color}><text x="50%" y="45%" textAnchor="middle" fill="#e2e8f0" fontSize={18} fontWeight={700}>{Math.round(totals.fib*10)/10}</text><text x="50%" y="62%" textAnchor="middle" fill="#64748b" fontSize={10}>/ {effectiveGoals.fib}g</text></Ring><div style={{marginTop:12,fontSize:14,color:pct("fib")>=100?"#10b981":pct("fib")>=60?"#f59e0b":"#ef4444"}}>{pct("fib")}% of daily goal</div></div>
          <div style={S.card}><div style={{fontSize:13,fontWeight:700,color:"#94a3b8",marginBottom:12,textTransform:"uppercase",letterSpacing:"0.05em"}}>Fibre Types</div>
            {fibT>0?(<div style={{display:"flex",height:14,borderRadius:7,overflow:"hidden",marginBottom:14,gap:1}}><div style={{width:`${(fibSol/fibT)*100}%`,background:FIB_SOL_COLOR}}/><div style={{width:`${(fibInsol/fibT)*100}%`,background:FIB_INSOL_COLOR}}/></div>):<div style={{height:14,borderRadius:7,background:"#1e293b",marginBottom:14}}/>}
            {[{label:"Soluble",value:fibSol,color:FIB_SOL_COLOR,note:"Slows digestion, feeds gut bacteria, helps lower cholesterol"},{label:"Insoluble",value:fibInsol,color:FIB_INSOL_COLOR,note:"Adds bulk, speeds gut transit, supports bowel regularity"}].map(({label,value,color,note},i)=>(<div key={label} style={{padding:"10px 0",borderBottom:i===0?"1px solid #1e293b":"none"}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}><div style={{display:"flex",alignItems:"center",gap:10}}><div style={{width:12,height:12,borderRadius:3,background:color}}/><span style={{fontSize:14,color:"#e2e8f0",fontWeight:500}}>{label}</span></div><div><span style={{fontSize:15,fontWeight:700,color}}>{Math.round(value*10)/10}g</span><span style={{fontSize:11,color:"#64748b",marginLeft:6}}>{fibT>0?Math.round((value/fibT)*100):0}%</span></div></div><div style={{fontSize:11,color:"#475569",marginTop:4,paddingLeft:22}}>{note}</div></div>))}
          </div>
          {fibCont.length>0&&(<div style={S.card}><div style={{fontSize:13,fontWeight:700,color:"#94a3b8",marginBottom:10,textTransform:"uppercase",letterSpacing:"0.05em"}}>Today's Sources</div>{fibCont.map((c,i)=>(<div key={i} style={{padding:"8px 0",borderBottom:i<fibCont.length-1?"1px solid #1e293b":"none"}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}><div><div style={{fontSize:13,color:"#e2e8f0"}}>{c.name}</div><div style={{fontSize:11,color:"#64748b"}}>{c.label}</div></div><div style={{textAlign:"right"}}><div style={{fontSize:13,fontWeight:600,color:NUTRIENT_META.fib.color}}>{Math.round(c.total*10)/10}g</div><div style={{fontSize:10,color:"#64748b"}}>{Math.round(c.sol*10)/10} sol / {Math.round(c.insol*10)/10} insol</div></div></div></div>))}</div>)}
          <div style={S.card}><div style={{fontSize:13,fontWeight:700,color:"#94a3b8",marginBottom:10,textTransform:"uppercase",letterSpacing:"0.05em"}}>Top Sources (per 100g)</div>{[...allFoods].sort((a,b)=>(b.fib||0)-(a.fib||0)).slice(0,8).map((f,i)=>(<div key={f.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"7px 0",borderBottom:i<7?"1px solid #1e293b":"none"}}><span style={{fontSize:13,color:"#e2e8f0"}}>{f.name}</span><div style={{textAlign:"right"}}><div style={{fontSize:13,fontWeight:600,color:NUTRIENT_META.fib.color}}>{Math.round((f.fib||0)*10)/10}g</div><div style={{fontSize:10,color:"#64748b"}}>{Math.round((f.fibSol||0)*10)/10} sol / {Math.round((f.fibInsol||0)*10)/10} insol</div></div></div>))}</div>
        </div>
      </div>
    );
  }

  if (view === "fatDetail") {
    const fatSat=dayLog.reduce((s,e)=>{if(e.type==="exercise"||e.type==="supplement")return s;if(e.type==="recipe")return s+recipeSubtotal(e,"fatSat");if(e.snapshot)return s+(e.snapshot.fatSat||0)*e.amount/100;const f=allFoods.find(x=>x.id===e.foodId);return s+(f?(f.fatSat||0)*e.amount/100:0);},0);
    const fatMufa=dayLog.reduce((s,e)=>{if(e.type==="exercise"||e.type==="supplement")return s;if(e.type==="recipe")return s+recipeSubtotal(e,"fatMufa");if(e.snapshot)return s+(e.snapshot.fatMufa||0)*e.amount/100;const f=allFoods.find(x=>x.id===e.foodId);return s+(f?(f.fatMufa||0)*e.amount/100:0);},0);
    const fatPufa=dayLog.reduce((s,e)=>{if(e.type==="exercise"||e.type==="supplement")return s;if(e.type==="recipe")return s+recipeSubtotal(e,"fatPufa");if(e.snapshot)return s+(e.snapshot.fatPufa||0)*e.amount/100;const f=allFoods.find(x=>x.id===e.foodId);return s+(f?(f.fatPufa||0)*e.amount/100:0);},0);
    const fatT=fatSat+fatMufa+fatPufa;
    const fatCont=dayLog.flatMap(e=>{if(e.type==="exercise"||e.type==="supplement")return[];if(e.type==="recipe"){const n=computeEntryNutrition(e.derivedIngredients||[],allFoods);if(!n.fat)return[];return[{name:`📖 ${e.recipeName}`,label:`${e.servings} srv`,total:n.fat,sat:recipeSubtotal(e,"fatSat"),mufa:recipeSubtotal(e,"fatMufa"),pufa:recipeSubtotal(e,"fatPufa")}];}if(e.snapshot){const t=(e.snapshot.fat||0)*e.amount/100;if(!t)return[];return[{name:e.foodName,label:`${e.amount}g`,total:t,sat:(e.snapshot.fatSat||0)*e.amount/100,mufa:(e.snapshot.fatMufa||0)*e.amount/100,pufa:(e.snapshot.fatPufa||0)*e.amount/100}];}const f=allFoods.find(x=>x.id===e.foodId);if(!f||!f.fat)return[];return[{name:e.foodName,label:`${e.amount}g`,total:f.fat*e.amount/100,sat:(f.fatSat||0)*e.amount/100,mufa:(f.fatMufa||0)*e.amount/100,pufa:(f.fatPufa||0)*e.amount/100}];}).sort((a,b)=>b.total-a.total);
    return (
      <div style={S.app}>
        <div style={S.header}><button style={{background:"none",border:"none",color:"#94a3b8",fontSize:15,cursor:"pointer"}} onClick={()=>setView("log")}>← Back</button><span style={{fontSize:15,fontWeight:700}}>Fat</span><div style={{width:48}}/></div>
        <div style={S.section}>
          <div style={{...S.card,textAlign:"center"}}><Ring value={totals.fat} max={effectiveGoals.fat} size={100} stroke={8} color={NUTRIENT_META.fat.color}><text x="50%" y="45%" textAnchor="middle" fill="#e2e8f0" fontSize={18} fontWeight={700}>{Math.round(totals.fat*10)/10}</text><text x="50%" y="62%" textAnchor="middle" fill="#64748b" fontSize={10}>/ {effectiveGoals.fat}g</text></Ring><div style={{marginTop:12,fontSize:14,color:pct("fat")>=100?"#10b981":pct("fat")>=60?"#f59e0b":"#ef4444"}}>{pct("fat")}% of daily goal</div></div>
          <div style={S.card}><div style={{fontSize:13,fontWeight:700,color:"#94a3b8",marginBottom:12,textTransform:"uppercase",letterSpacing:"0.05em"}}>Fat Types</div>
            {fatT>0?(<div style={{display:"flex",height:14,borderRadius:7,overflow:"hidden",marginBottom:14,gap:1}}><div style={{width:`${(fatSat/fatT)*100}%`,background:FAT_SAT_COLOR}}/><div style={{width:`${(fatMufa/fatT)*100}%`,background:FAT_MUFA_COLOR}}/><div style={{width:`${(fatPufa/fatT)*100}%`,background:FAT_PUFA_COLOR}}/></div>):<div style={{height:14,borderRadius:7,background:"#1e293b",marginBottom:14}}/>}
            {[{label:"Saturated",value:fatSat,color:FAT_SAT_COLOR,note:"Limit where possible — raises LDL cholesterol"},{label:"Monounsaturated",value:fatMufa,color:FAT_MUFA_COLOR,note:"Heart-healthy — oleic acid from avocado, olive oil, nuts"},{label:"Polyunsaturated",value:fatPufa,color:FAT_PUFA_COLOR,note:"Includes omega-3 & omega-6 — essential, anti-inflammatory"}].map(({label,value,color,note},i)=>(<div key={label} style={{padding:"10px 0",borderBottom:i<2?"1px solid #1e293b":"none"}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}><div style={{display:"flex",alignItems:"center",gap:10}}><div style={{width:12,height:12,borderRadius:3,background:color}}/><span style={{fontSize:14,color:"#e2e8f0",fontWeight:500}}>{label}</span></div><div><span style={{fontSize:15,fontWeight:700,color}}>{Math.round(value*10)/10}g</span><span style={{fontSize:11,color:"#64748b",marginLeft:6}}>{fatT>0?Math.round((value/fatT)*100):0}%</span></div></div><div style={{fontSize:11,color:"#475569",marginTop:4,paddingLeft:22}}>{note}</div></div>))}
          </div>
          {fatCont.length>0&&(<div style={S.card}><div style={{fontSize:13,fontWeight:700,color:"#94a3b8",marginBottom:10,textTransform:"uppercase",letterSpacing:"0.05em"}}>Today's Sources</div>{fatCont.map((c,i)=>(<div key={i} style={{padding:"8px 0",borderBottom:i<fatCont.length-1?"1px solid #1e293b":"none"}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}><div><div style={{fontSize:13,color:"#e2e8f0"}}>{c.name}</div><div style={{fontSize:11,color:"#64748b"}}>{c.label}</div></div><div style={{textAlign:"right"}}><div style={{fontSize:13,fontWeight:600,color:NUTRIENT_META.fat.color}}>{Math.round(c.total*10)/10}g</div><div style={{fontSize:10,color:"#64748b"}}>{Math.round(c.sat*10)/10} sat · {Math.round(c.mufa*10)/10} mufa · {Math.round(c.pufa*10)/10} pufa</div></div></div></div>))}</div>)}
          <div style={S.card}><div style={{fontSize:13,fontWeight:700,color:"#94a3b8",marginBottom:10,textTransform:"uppercase",letterSpacing:"0.05em"}}>Top Sources (per 100g)</div>{[...allFoods].sort((a,b)=>(b.fat||0)-(a.fat||0)).slice(0,8).map((f,i)=>(<div key={f.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"7px 0",borderBottom:i<7?"1px solid #1e293b":"none"}}><span style={{fontSize:13,color:"#e2e8f0"}}>{f.name}</span><div style={{textAlign:"right"}}><div style={{fontSize:13,fontWeight:600,color:NUTRIENT_META.fat.color}}>{Math.round((f.fat||0)*10)/10}g</div><div style={{fontSize:10,color:"#64748b"}}>{Math.round((f.fatSat||0)*10)/10} sat · {Math.round((f.fatMufa||0)*10)/10} mufa · {Math.round((f.fatPufa||0)*10)/10} pufa</div></div></div>))}</div>
        </div>
      </div>
    );
  }

  if (view === "detail" && detailNutrient) {
    const k=detailNutrient, meta=NUTRIENT_META[k];
    const cont=dayLog.flatMap(e=>{if(e.type==="exercise")return[];if(e.type==="supplement"){const v=suppContrib(e,k);return v>0?[{name:`💊 ${e.stackName}`,label:"supplement",value:v,isSupp:true}]:[]; }if(e.type==="recipe"){const n=computeEntryNutrition(e.derivedIngredients||[],allFoods);return n[k]?[{name:`📖 ${e.recipeName}`,label:`${e.servings} srv`,value:n[k]}]:[];}const val=e.snapshot?(e.snapshot[k]||0)*e.amount/100:(allFoods.find(x=>x.id===e.foodId)?.[k]||0)*e.amount/100;return val?[{name:e.foodName,label:`${e.amount}g`,value:val}]:[];}).sort((a,b)=>b.value-a.value);
    return (
      <div style={S.app}>
        <div style={S.header}><button style={{background:"none",border:"none",color:"#94a3b8",fontSize:15,cursor:"pointer"}} onClick={()=>setView("log")}>← Back</button><span style={{fontSize:15,fontWeight:700}}>{meta.label}</span><div style={{width:48}}/></div>
        <div style={S.section}>
          <div style={{...S.card,textAlign:"center"}}><Ring value={totals[k]} max={goals[k]} size={100} stroke={8} color={meta.color}><text x="50%" y="45%" textAnchor="middle" fill="#e2e8f0" fontSize={18} fontWeight={700}>{Math.round(totals[k]*10)/10}</text><text x="50%" y="62%" textAnchor="middle" fill="#64748b" fontSize={10}>/ {goals[k]} {meta.unit}</text></Ring><div style={{marginTop:12,fontSize:14,color:pct(k)>=100?"#10b981":pct(k)>=60?"#f59e0b":"#ef4444"}}>{pct(k)}% of daily goal</div></div>
          {cont.length>0&&(<div style={S.card}><div style={{fontSize:13,fontWeight:700,color:"#94a3b8",marginBottom:10,textTransform:"uppercase"}}>Today's Sources</div>{cont.map((c,i)=>(<div key={i} style={{display:"flex",justifyContent:"space-between",padding:"6px 0",borderBottom:"1px solid #1e293b",background:c.isSupp?"rgba(167,139,250,0.05)":"transparent",borderRadius:c.isSupp?6:0}}><div><div style={{fontSize:13,color:c.isSupp?"#c4b5fd":"#e2e8f0"}}>{c.name}</div><div style={{fontSize:11,color:"#64748b"}}>{c.label}</div></div><div style={{fontSize:13,fontWeight:600,color:meta.color}}>{Math.round(c.value*10)/10} {meta.unit}</div></div>))}</div>)}
          <div style={S.card}><div style={{fontSize:13,fontWeight:700,color:"#94a3b8",marginBottom:10,textTransform:"uppercase"}}>Top Sources (per 100g)</div>{[...allFoods].sort((a,b)=>(b[k]||0)-(a[k]||0)).slice(0,8).map((f,i)=>(<div key={f.id} style={{display:"flex",justifyContent:"space-between",padding:"6px 0",borderBottom:"1px solid #1e293b"}}><span style={{fontSize:13,color:"#e2e8f0"}}>{f.name}</span><span style={{fontSize:13,fontWeight:600,color:meta.color}}>{Math.round((f[k]||0)*10)/10} {meta.unit}</span></div>))}</div>
        </div>
      </div>
    );
  }

  // ── EDIT LOGGED RECIPE ────────────────────────────────────────────────
  if (view === "editLoggedRecipe" && editingLogEntry) {
    const recipe = recipes.find(r => r.id === editingLogEntry.recipeId);
    const servings = parseFloat(editLogServings) || 1;
    let previewDI = editingLogEntry.derivedIngredients || [];
    if (recipe) {
      const rs = Math.max(Number(recipe.servings) || 1, 0.01);
      const frac = servings / rs;
      previewDI = recipe.ingredients.map(ing => ({ foodId: ing.foodId, foodName: ing.foodName, amount_g: Math.round(ing.amount_g * frac * 10) / 10 }));
    }
    const nut = computeEntryNutrition(previewDI, allFoodsForRender);
    return (
      <div style={S.app}>
        <div style={S.header}>
          <button style={{background:"none",border:"none",color:"#94a3b8",fontSize:15,cursor:"pointer"}} onClick={() => { setEditingLogEntry(null); setView("log"); }}>← Back</button>
          <span style={{fontSize:15,fontWeight:700}}>Edit Log Entry</span>
          <button style={{background:"none",border:"none",color:"#3b82f6",fontSize:13,fontWeight:700,cursor:"pointer"}} onClick={saveEditedRecipeEntry}>Save</button>
        </div>
        <div style={S.section}>
          <div style={{fontSize:14,fontWeight:600,color:"#a78bfa",marginBottom:12}}>📖 {editingLogEntry.recipeName}</div>
          <div style={S.card}>
            <label style={S.label}>Servings</label>
            <input style={{...S.input,marginBottom:8}} type="number" inputMode="decimal" value={editLogServings} onChange={e => setEditLogServings(e.target.value)}/>
            <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:16}}>
              {[0.5,1,1.5,2,3,4].map(q => <button key={q} style={S.pill(editLogServings===String(q))} onClick={() => setEditLogServings(String(q))}>{q===0.5?"½":q}</button>)}
            </div>
            <label style={S.label}>Meal</label>
            <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:16}}>
              {MEALS.map(m => <button key={m} style={S.pill(editLogMeal===m)} onClick={() => setEditLogMeal(m)}>{m}</button>)}
            </div>
            <div style={{background:"#0a0f1a",borderRadius:10,padding:12}}>
              <div style={{fontSize:11,fontWeight:700,color:"#475569",marginBottom:8,textTransform:"uppercase"}}>Preview at {Math.round(servings*10)/10} serving{servings===1?"":"s"}</div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:6}}>
                {MACROS.map(k => (<div key={k} style={{textAlign:"center"}}><div style={{fontSize:14,fontWeight:700,color:NUTRIENT_META[k].color}}>{Math.round((nut[k]||0)*10)/10}</div><div style={{fontSize:10,color:"#64748b"}}>{NUTRIENT_META[k].label}</div></div>))}
              </div>
            </div>
          </div>
          <div style={S.card}>
            <div style={{fontSize:13,fontWeight:700,color:"#94a3b8",marginBottom:10,textTransform:"uppercase",letterSpacing:"0.05em"}}>Ingredients at this serving</div>
            {previewDI.map((ing, i) => (
              <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"7px 0",borderBottom:i<previewDI.length-1?"1px solid #1e293b":"none"}}>
                <div style={{fontSize:13,color:"#e2e8f0"}}>{ing.foodName}</div>
                <div style={{fontSize:12,color:"#64748b"}}>{ing.amount_g}g</div>
              </div>
            ))}
            {previewDI.length === 0 && <div style={{fontSize:13,color:"#475569",textAlign:"center",padding:"12px 0"}}>No ingredient data captured at log time</div>}
          </div>
        </div>
      </div>
    );
  }

  // ── EDIT LOGGED EXERCISE ──────────────────────────────────────────────
  if (view === "editLoggedExercise" && editingLogEntry) {
    const dur = parseFloat(editLogDuration) || 0;
    // Compute preview burn: manual override > MET calc > pro-rata
    let previewBurn;
    if (editLogBurn !== "") {
      previewBurn = parseInt(editLogBurn) || 0;
    } else {
      const act = EXERCISE_ACTIVITIES.find(a => (a.label + " - " + a.intensity) === editingLogEntry.activity);
      if (act) {
        const wt = parseFloat(profile?.weightKg) || 70;
        previewBurn = Math.round(act.met * wt * (dur / 60));
      } else {
        const origDur = editingLogEntry.duration_min || dur;
        previewBurn = origDur > 0 ? Math.round((editingLogEntry.calories_burned / origDur) * dur) : 0;
      }
    }
    return (
      <div style={S.app}>
        <div style={S.header}>
          <button style={{background:"none",border:"none",color:"#94a3b8",fontSize:15,cursor:"pointer"}} onClick={() => { setEditingLogEntry(null); setView("log"); }}>← Back</button>
          <span style={{fontSize:15,fontWeight:700}}>Edit Exercise</span>
          <button style={{background:"none",border:"none",color:"#3b82f6",fontSize:13,fontWeight:700,cursor:"pointer"}} onClick={saveEditedExerciseEntry}>Save</button>
        </div>
        <div style={S.section}>
          <div style={{fontSize:14,fontWeight:600,color:"#4ade80",marginBottom:12}}>🏃 {editingLogEntry.activity}</div>
          <div style={S.card}>
            <label style={S.label}>Duration (minutes)</label>
            <input style={{...S.input,marginBottom:8}} type="number" inputMode="numeric" value={editLogDuration} onChange={e => { setEditLogDuration(e.target.value); setEditLogBurn(""); }}/>
            <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:16}}>
              {[30,45,60,90,120,180].map(d => <button key={d} style={S.pill(editLogDuration===String(d)&&editLogBurn==="")} onClick={() => { setEditLogDuration(String(d)); setEditLogBurn(""); }}>{d}</button>)}
            </div>
            <div style={{background:"#0a0f1a",borderRadius:10,padding:14,marginBottom:16}}>
              <div style={{fontSize:11,fontWeight:700,color:"#475569",marginBottom:6,textTransform:"uppercase"}}>Calories burned</div>
              <div style={{fontSize:28,fontWeight:700,color:"#4ade80",marginBottom:12}}>{previewBurn} kcal</div>
              <label style={S.label}>Override (optional)</label>
              <input style={S.input} type="number" inputMode="numeric" placeholder="Auto-computed" value={editLogBurn} onChange={e => setEditLogBurn(e.target.value)}/>
            </div>
            <button style={{width:"100%",padding:14,borderRadius:12,border:"none",background:dur>0?"#16a34a":"#1e293b",color:dur>0?"#fff":"#64748b",fontSize:15,fontWeight:700,cursor:dur>0?"pointer":"default"}} disabled={dur<=0} onClick={saveEditedExerciseEntry}>Save Changes</button>
          </div>
        </div>
      </div>
    );
  }

  // ── EDIT LOGGED SUPPLEMENT ────────────────────────────────────────────
  if (view === "editLoggedSupp" && editingLogEntry) {
    return (
      <div style={S.app}>
        <div style={S.header}>
          <button style={{background:"none",border:"none",color:"#94a3b8",fontSize:15,cursor:"pointer"}} onClick={() => { setEditingLogEntry(null); setView("log"); }}>← Back</button>
          <span style={{fontSize:15,fontWeight:700}}>Edit Supplement Log</span>
          <button style={{background:"none",border:"none",color:"#3b82f6",fontSize:13,fontWeight:700,cursor:"pointer"}} onClick={saveEditedSuppEntry}>Save</button>
        </div>
        <div style={S.section}>
          <div style={{fontSize:14,fontWeight:600,color:"#c4b5fd",marginBottom:12}}>💊 {editingLogEntry.stackName}</div>
          <div style={{fontSize:12,color:"#64748b",marginBottom:10}}>Adjust doses. Tap a dose field to override.</div>
          <div style={S.card}>
            {editLogSuppItems.map((item, idx) => (
              <div key={idx} style={{...S.suppRow}}>
                <div style={{flex:1}}>
                  <div style={{fontSize:14,fontWeight:500,color:"#e2e8f0"}}>{item.name}</div>
                  <div style={{fontSize:12,color:"#64748b",marginTop:2}}>Logged: {item.dose_amount}{item.dose_unit}</div>
                </div>
                <div style={{width:100}}>
                  <input style={{...S.input,width:"100%",padding:"6px 8px",fontSize:13,textAlign:"right"}} type="number" inputMode="decimal"
                    placeholder={String(item.dose_amount)} value={item.doseOverride}
                    onChange={e => setEditLogSuppItems(prev => prev.map((x,i) => i===idx ? {...x, doseOverride: e.target.value} : x))}/>
                  <div style={{fontSize:10,color:"#475569",textAlign:"right",marginTop:2}}>{item.dose_unit}</div>
                </div>
              </div>
            ))}
          </div>
          <button style={{width:"100%",padding:14,borderRadius:12,border:"none",background:"#7c3aed",color:"#fff",fontSize:15,fontWeight:700,cursor:"pointer",marginTop:8}} onClick={saveEditedSuppEntry}>Save Changes</button>
        </div>
      </div>
    );
  }

  // ── MANAGE CUSTOM FOODS ───────────────────────────────────────────────
  if (view === "manageCustomFoods") {
    const active  = customFoods.filter(f => !f.deleted);
    const deleted = customFoods.filter(f =>  f.deleted);
    return (
      <div style={S.app}>
        <div style={S.header}>
          <button style={{background:"none",border:"none",color:"#94a3b8",fontSize:15,cursor:"pointer"}} onClick={() => setView("add")}>← Back</button>
          <span style={{fontSize:15,fontWeight:700}}>Custom Foods</span>
          <button style={{background:"none",border:"none",color:"#3b82f6",fontSize:13,fontWeight:600,cursor:"pointer"}} onClick={() => setView("customAdd")}>+ New</button>
        </div>
        <div style={S.section}>
          {active.length === 0 && deleted.length === 0 && (
            <div style={{textAlign:"center",padding:"40px 0",color:"#475569"}}><div style={{fontSize:32,marginBottom:8}}>🥘</div><div style={{fontSize:14}}>No custom foods yet</div></div>
          )}
          {active.length > 0 && (
            <div style={S.card}>
              <div style={{fontSize:13,fontWeight:700,color:"#94a3b8",marginBottom:10,textTransform:"uppercase",letterSpacing:"0.05em"}}>Active ({active.length})</div>
              {active.map((f, i) => (
                <div key={f.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 0",borderBottom:i<active.length-1?"1px solid #1e293b":"none"}}>
                  <div>
                    <div style={{fontSize:14,fontWeight:500,color:"#e2e8f0"}}>{f.name}</div>
                    <div style={{fontSize:11,color:"#64748b"}}>{f.cat} · {f.cal} kcal/100g</div>
                  </div>
                  <button style={{background:"none",border:"1px solid #ef4444",borderRadius:8,color:"#ef4444",fontSize:12,fontWeight:600,padding:"4px 10px",cursor:"pointer"}} onClick={() => softDeleteCustomFood(f.id)}>Delete</button>
                </div>
              ))}
            </div>
          )}
          {deleted.length > 0 && (
            <div style={{...S.card,marginTop:12,opacity:0.7}}>
              <div style={{fontSize:13,fontWeight:700,color:"#64748b",marginBottom:10,textTransform:"uppercase",letterSpacing:"0.05em"}}>Deleted ({deleted.length})</div>
              <div style={{fontSize:11,color:"#475569",marginBottom:10}}>Deleted foods are hidden from search but historical log entries still display correctly.</div>
              {deleted.map((f, i) => (
                <div key={f.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 0",borderBottom:i<deleted.length-1?"1px solid #1e293b":"none"}}>
                  <div>
                    <div style={{fontSize:14,fontWeight:500,color:"#64748b",textDecoration:"line-through"}}>{f.name}</div>
                    <div style={{fontSize:11,color:"#475569"}}>{f.cat} · {f.cal} kcal/100g</div>
                  </div>
                  <button style={{background:"none",border:"1px solid #3b82f6",borderRadius:8,color:"#3b82f6",fontSize:12,fontWeight:600,padding:"4px 10px",cursor:"pointer"}} onClick={() => restoreCustomFood(f.id)}>Restore</button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  return null;
}
