import Unit, { CombinationUnit, RelativeUnit, CustomUnit, UnitNameConstruct } from "@goggles/unit-system";
import SIUnits from "@goggles/unit-system-si-units";

let uscsUnits: {[key:string]: Unit} = {}

// Defined by https://www.nist.gov/system/files/documents/2017/05/09/AppB-11-hb44-final.pdf
uscsUnits.yard =        RelativeUnit.MultipleOf(SIUnits.meter, 0.9144,          new UnitNameConstruct('yard', 'yd'))
uscsUnits.pound =   RelativeUnit.MultipleOf(SIUnits.kilogram, 0.45359237,   new UnitNameConstruct('pound', 'lbm'))

// Defined based on personal knowledge and https://en.wikipedia.org/wiki/United_States_customary_units
uscsUnits.foot = RelativeUnit.FractionOf(uscsUnits.yard, 3,     new UnitNameConstruct('foot', 'ft', ["'", 'ft', 'foot']))
uscsUnits.inch = RelativeUnit.FractionOf(uscsUnits.inch, 12,    new UnitNameConstruct('inch', 'in', ['"', 'in', 'inch']))
uscsUnits.mile = RelativeUnit.MultipleOf(uscsUnits.foot, 5280,  new UnitNameConstruct('mile', 'mi'))

let sqIn = new CombinationUnit([[uscsUnits.foot, 2]])

uscsUnits.acre = RelativeUnit.MultipleOf(sqIn, 43560, new UnitNameConstruct('acre'))

let cuIn = new CombinationUnit([[uscsUnits.in, 3]])

uscsUnits.gallon =      RelativeUnit.MultipleOf(cuIn, 231,                  new UnitNameConstruct('gallon', 'gal'))
uscsUnits.quart =       RelativeUnit.FractionOf(uscsUnits.gallon, 4,        new UnitNameConstruct('quart', 'qt'))
uscsUnits.pint =        RelativeUnit.FractionOf(uscsUnits.quart, 2,         new UnitNameConstruct('pint', 'pt'))
uscsUnits.cup =         RelativeUnit.FractionOf(uscsUnits.quart, 2,         new UnitNameConstruct('cup', 'c'))
uscsUnits.fluidOunce =  RelativeUnit.FractionOf(uscsUnits.cup, 8,           new UnitNameConstruct('fluid ounce', 'fl oz'))
uscsUnits.tablespoon =  RelativeUnit.FractionOf(uscsUnits.fluidOunce, 2,    new UnitNameConstruct('tablespoon', 'Tbsp'))
uscsUnits.teaspoon =    RelativeUnit.FractionOf(uscsUnits.tablespoon, 3,    new UnitNameConstruct('teaspoon', 'tsp'))

// Add other mass units,  
uscsUnits.ounce =       RelativeUnit.FractionOf(uscsUnits.pound, 16,    new UnitNameConstruct('ounce', 'oz'))
uscsUnits.ton =         RelativeUnit.MultipleOf(uscsUnits.pound, 2000,  new UnitNameConstruct('ton'))

// TODO: Move these to "All USCS Units"
// uscsUnits.grain =       RelativeUnit.FractionOf('grain', uscsUnits.poundMass, 7000, 'gr')
// uscsUnits.troyOunce =   RelativeUnit.MultipleOf('troy ounce', uscsUnits.grain, 24 * 20, 'oz t')
// uscsUnits.troyPound =   RelativeUnit.MultipleOf('troy pound', uscsUnits.troyOunce, 12, 'lb t')

// Weight units
let officialUscsGravAccelM = 9.80665    // m/s^2    // actual official value
let officialUscsGravAccelFt = 32.174049 // ft/s^2   // converted

uscsUnits.gravity = RelativeUnit.MultipleOf(
    new CombinationUnit([[SIUnits.meter, 1], [SIUnits.second, -2]]),
    officialUscsGravAccelM,
    new UnitNameConstruct("Earth gravity", 'G', ['gravity'])
)

uscsUnits.poundForce =  new CombinationUnit(
    [[uscsUnits.pound, 1], [uscsUnits.gravity, 1]], 
    new UnitNameConstruct("pound force", 'lbf', ['lb_f', 'pound-force'])
)
// TODO: Include ounce-force and ton-force? 

// Mass unit derived from weight units
uscsUnits.slug = new CombinationUnit(
    [[uscsUnits.poundForce, 1], [SIUnits.second, 2], [uscsUnits.foot, -1]],
    new UnitNameConstruct("slug")
)

// Defined based on personal knowledge and https://en.wikipedia.org/wiki/Kelvin, https://en.wikipedia.org/wiki/Rankine_scale, https://en.wikipedia.org/wiki/Fahrenheit
uscsUnits.Rankine =     RelativeUnit.MultipleOf(SIUnits.kelvin, 5/9, new UnitNameConstruct('degrees Rankine', '°R', ["°R", "°Ra", "degrees Rankine"]))
uscsUnits.Fahrenheit =  new CustomUnit(
    SIUnits.kelvin.shape, 
    (degreesF) => (5/9) * (degreesF + 459.67),
    (degreesK) => ((9/5) * degreesK) - 459.67,
    new UnitNameConstruct('degrees Fahrenheit', '°F', ["°F", "degrees Fahrenheit"])
)

export var USCSUnits = uscsUnits
export default uscsUnits