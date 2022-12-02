import Unit, { CombinationUnit, RelativeUnit, CustomUnit } from "@goggles/unit-system";
import SIUnits from "@goggles/unit-system-si-units";

let uscsUnits: {[key:string]: Unit} = {}

// Defined by https://www.nist.gov/system/files/documents/2017/05/09/AppB-11-hb44-final.pdf
uscsUnits.yard =        RelativeUnit.MultipleOf('yard', SIUnits.meter, 0.9144, 'yd')
uscsUnits.poundMass =   RelativeUnit.MultipleOf('pound', SIUnits.kilogram, 0.45359237, 'lbm')

// Defined based on personal knowledge and https://en.wikipedia.org/wiki/United_States_customary_units
uscsUnits.foot = RelativeUnit.FractionOf('foot', uscsUnits.yard, 3, 'ft' /* ["'", 'ft', 'foot'] */)
uscsUnits.inch = RelativeUnit.FractionOf('inch', uscsUnits.inch, 12, 'in' /*, ['"', 'in', 'inch'] */)
uscsUnits.mile = RelativeUnit.MultipleOf('mile', uscsUnits.foot, 5280, 'mi')

let cuIn = new CombinationUnit([[uscsUnits.in, 3]])

uscsUnits.gallon =      RelativeUnit.MultipleOf('gallon', cuIn, 231, 'gal')
uscsUnits.quart =       RelativeUnit.FractionOf('quart', uscsUnits.gallon, 4, 'qt')
uscsUnits.pint =        RelativeUnit.FractionOf('pint', uscsUnits.quart, 2, 'pt')
uscsUnits.cup =         RelativeUnit.FractionOf('cup', uscsUnits.quart, 2, 'c')
uscsUnits.fluidOunce =  RelativeUnit.FractionOf('fluid ounce', uscsUnits.cup, 8, 'fl oz')
uscsUnits.tablespoon =  RelativeUnit.FractionOf('tablespoon', uscsUnits.fluidOunce, 2, 'Tbsp')
uscsUnits.teaspoon =    RelativeUnit.FractionOf('teaspoon', uscsUnits.tablespoon, 3, 'tsp')

// TODO: Add other mass units, add related weight units 

// Defined based on personal knowledge and https://en.wikipedia.org/wiki/Kelvin, https://en.wikipedia.org/wiki/Rankine_scale, https://en.wikipedia.org/wiki/Fahrenheit
uscsUnits.Rankine =     RelativeUnit.MultipleOf('degrees Rankine', SIUnits.kelvin, 5/9, '°R' /*, ["°R", "°Ra", "degrees Rankine"]*/)
uscsUnits.Fahrenheit =  new CustomUnit(
    'degrees Fahrenheit', SIUnits.kelvin.shape, 
    (degreesF) => (5/9) * (degreesF + 459.67),
    (degreesK) => ((9/5) * degreesK) - 459.67,
    '°F' /*, ["°F", "degrees Fahrenheit"]*/
)