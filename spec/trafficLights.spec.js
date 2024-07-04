const trafficLights = require('../index'); // Importar desde el archivo donde está definida

function doTest(init, expected, n) {
  let actual = trafficLights(init, n);
  console.log('Expected: ');
  for (let i = 0; i < expected.length; i++) {
    console.log(display(expected[i]));
  }
  // Only show expected result if your result is incorrect
  if (JSON.stringify(actual) !== JSON.stringify(expected)) {
    console.log('\nYour result: ');
    for (let i = 0; i < actual.length; i++) {
      console.log(display(actual[i]));
    }
  }
  assert.deepEqual(actual, expected);
}

describe("One car", function() {
  it("Should work for example test", function() {
    let n = 10;
    let sim = [
      "C...R............G......",  // 0
      ".C..R............G......",  // 1
      "..C.R............G......",  // 2
      "...CR............G......",  // 3
      "...CR............G......",  // 4
      "....C............O......",  // 5
      "....GC...........R......",  // 6
      "....G.C..........R......",  // 7
      "....G..C.........R......",  // 8
      "....G...C........R......",  // 9
      "....O....C.......R......"   // 10
    ];
    
    doTest(sim[0], sim, n);
  });
  
  it('Car falls off the end', () => {
    let n = 5;
    let sim = [
      "CG...",  // 0
      ".C...",  // 1
      ".GC..",  // 2
      ".G.C.",  // 3
      ".G..C",  // 4
      ".O..."   // 5
    ];
    
    doTest(sim[0], sim, n);
  });
  
  it('No lights', () => {
    let n = 4;
    let sim = [
      "C....",  // 0
      ".C...",  // 1
      "..C..",  // 2
      "...C.",  // 3
      "....C",  // 4
    ];
    
    doTest(sim[0], sim, n);
  });
  
  it('No time', () => {
    let n = 0;
    let sim = [ "C...." ];
    
    doTest(sim[0], sim, n);
  });
  
  it('Red', () => {
    let n = 13;
    let sim = [ 
      "C.R...G...",  // 0
      ".CR...G...",  // 1
      ".CR...G...",  // 2
      ".CR...G...",  // 3
      ".CR...G...",  // 4
      "..C...O...",  // 5
      "..GC..R...",  // 6
      "..G.C.R...",  // 7
      "..G..CR...",  // 8
      "..G..CR...",  // 9
      "..O..CR...",  // 10
      "..R...C...",  // 11
      "..R...GC..",  // 12
      "..R...G.C."   // 13
    ];
    
    doTest(sim[0], sim, n);
  });
  
  it('Orange', () => {
    let n = 23;
    let sim = [ 
      "C....G........R...",  // 0
      ".C...G........R...",  // 1
      "..C..G........R...",  // 2
      "...C.G........R...",  // 3
      "....CG........R...",  // 4
      "....CO........G...",  // 5 - car stops for orange light
      "....CR........G...",  // 6
      "....CR........G...",  // 7
      "....CR........G...",  // 8
      "....CR........G...",  // 9
      "....CR........O...",  // 10
      ".....C........R...",  // 11
      ".....GC.......R...",  // 12
      ".....G.C......R...",  // 13
      ".....G..C.....R...",  // 14
      ".....G...C....R...",  // 15
      ".....O....C...G...",  // 16
      ".....R.....C..G...",  // 17
      ".....R......C.G...",  // 18
      ".....R.......CG...",  // 19
      ".....R........C...",  // 20  - light turned orange when car was already in intersection. It proceeds.
      ".....R........OC..",  // 21
      ".....G........R.C.",  // 22
      ".....G........R..C",  // 23
    ];
    
    doTest(sim[0], sim, n);
  });
  
  it('Green', () => {
    let n = 17;
    let sim = [ 
      "CG..G..R...G...G...",  // 0
      ".C..G..R...G...G...",  // 1
      ".GC.G..R...G...G...",  // 2
      ".G.CG..R...G...G...",  // 3
      ".G..C..R...G...G...",  // 4
      ".O..OC.G...O...O...",  // 5
      ".R..R.CG...R...R...",  // 6
      ".R..R..C...R...R...",  // 7
      ".R..R..GC..R...R...",  // 8
      ".R..R..G.C.R...R...",  // 9
      ".R..R..O..CR...R...",  // 10 
      ".G..G..R...C...G...",  // 11
      ".G..G..R...GC..G...",  // 12
      ".G..G..R...G.C.G...",  // 13
      ".G..G..R...G..CG...",  // 14
      ".G..G..R...G...C...",  // 15
      ".O..O..G...O...OC..",  // 16
      ".R..R..G...R...R.C."   // 17
    ];
    
    doTest(sim[0], sim, n);
  });
});

describe('Multiple cars', () => {
  it('Example', () => {
    let n = 16;
    let sim = [
      "CCC.G...R...", // 0 initial state as passed
      ".CCCG...R...", // 1
      "..CCC...R...", // 2 show 1st car, not the green light
      "..CCGC..R...", // 3 2nd car cannot enter intersection because 1st car blocks the exit
      "...CC.C.R...", // 4 show 2nd car, not the green light
      "...COC.CG...", // 5 3rd car stops for the orange light
      "...CR.C.C...", // 6
      "...CR..CGC..", // 7
      "...CR...C.C.", // 8
      "...CR...GC.C", // 9
      "...CR...O.C.", // 10
      "....C...R..C", // 11 3rd car can proceed
      "....GC..R...", // 12
      "....G.C.R...", // 13
      "....G..CR...", // 14
      "....G..CR...", // 15
      "....O...C..."  // 16
    ];
    
    doTest(sim[0], sim, n);
  });
  
  it('Car falls off at the end', () => {
    let n = 6;
    let sim = [
      "CCC.G", // 0 initial state as passed
      ".CCCG", // 1
      "..CCC", // 2 show 1st car, not the green light
      "...CC", // 3 1st car disappears! show 2nd car, not the greet light
      "....C", // 4 2nd car disappears! show 3rd car, not the green light
      "....O", // 5 
      "....R"  // 6
    ];
    
    doTest(sim[0], sim, n);
  });
  
  it('No lights', () => {
    let n = 4;
    let sim = [
     "CCCC....",  // 0
      ".CCCC...",  // 1
      "..CCCC..",  // 2
      "...CCCC.",  // 3
      "....CCCC",  // 4
    ];
    
    doTest(sim[0], sim, n);
  });
  
  it('No time', () => {
    let n = 0;
    let sim = [
     "CCCC...."  // 0
    ];
    
    doTest(sim[0], sim, n);
  });
  
  it('Red', () => {
    let n = 17;
    let sim = [
      "CCC.R...G...",  // 0
      ".CCCR...G...",  // 1
      ".CCCR...G...",  // 2
      ".CCCR...G...",  // 3
      ".CCCR...G...",  // 4
      "..CCC...O...",  // 5 1st car proceeds
      "..CCGC..R...",  // 6
      "...CC.C.R...",  // 7 2nd car proceeds
      "...CGC.CR...",  // 8 
      "....C.CCR...",  // 9 3rd car proceeds
      "....OCCCR...",  // 10 Cars are now all together again waiting at the 2nd light
      "....R.CCC...",  // 11 1st car proceeds (2nd light)
      "....R.CCGC..",  // 12
      "....R..CC.C.",  // 13 2nd car proceeds (2nd light)
      "....R..CGC.C",  // 14 
      "....R...C.C.",  // 15 3rd car proceeds (2nd light)
      "....G...OC.C",  // 16 
      "....G...R.C.",  // 17 
    ];
    
    doTest(sim[0], sim, n);
  });
  
  it('Orange', () => {
    let n = 23;
    let sim = [
      "CC....G........R...",  // 0
      ".CC...G........R...",  // 1
      "..CC..G........R...",  // 2
      "...CC.G........R...",  // 3
      "....CCG........R...",  // 4
      "....CCO........G...",  // 5 car 1 stops for orange light
      "....CCR........G...",  // 6
      "....CCR........G...",  // 7
      "....CCR........G...",  // 8
      "....CCR........G...",  // 9
      "....CCR........O...",  // 10
      ".....CC........R...",  // 11
      ".....CGC.......R...",  // 12 car 2 waits for clear passage thru intersection
      "......C.C......R...",  // 13
      "......GC.C.....R...",  // 14
      "......G.C.C....R...",  // 15
      "......O..C.C...G...",  // 16
      "......R...C.C..G...",  // 17
      "......R....C.C.G...",  // 18
      "......R.....C.CG...",  // 19
      "......R......C.C...",  // 20 light turned orange when car 1 was already in intersection. It proceeds...
      "......R.......COC..",  // 21 ...but cat 2 waits for the orage light
      "......G.......CR.C.",  // 22
      "......G.......CR..C",  // 23
    ];
    
    doTest(sim[0], sim, n);
  });
  
  it('Green', () => {
    let n = 17;
    let sim = [
      "C.CG..G..R...G...G...",  // 0
      ".C.C..G..R...G...G...",  // 1
      "..CGC.G..R...G...G...",  // 2
      "...C.CG..R...G...G...",  // 3
      "...GC.C..R...G...G...",  // 4
      "...O.COC.G...O...O...",  // 5 lights change and stop car 2, car 1 continutes to get all green lights
      "...R.CR.CG...R...R...",  // 6
      "...R.CR..C...R...R...",  // 7
      "...R.CR..GC..R...R...",  // 8
      "...R.CR..G.C.R...R...",  // 9
      "...R.CR..O..CR...R...",  // 10 
      "...G..C..R...C...G...",  // 11
      "...G..GC.R...GC..G...",  // 12
      "...G..G.CR...G.C.G...",  // 13
      "...G..G.CR...G..CG...",  // 14
      "...G..G.CR...G...C...",  // 15
      "...O..O..C...O...OC..",  // 16
      "...R..R..GC..R...R.C."   // 17
    ];
    
    doTest(sim[0], sim, n);
  });
  
  it('Car 4 gets left behind', () => {
    let n = 18;
    let sim = [
      "CRCRCRCR.",  // 0 4 cars all waiting at red lights
      "CRCRCRCR.",  // 1
      "CRCRCRCR.",  // 2
      "CRCRCRCR.",  // 3
      "CRCRCRCR.",  // 4
      ".C.C.C.C.",  // 5 lights turn green - all proceed...
      ".GCGCGCGC",  // 6
      ".G.C.C.C.",  // 7
      ".G.GCGCGC",  // 8
      ".G.G.C.C.",  // 9
      ".O.O.OCOC",  // 10 lights turn orange - cars on intersections get thru
      ".R.R.RCR.",  // 11 red lights - car 4 gets left behind :-(
      ".R.R.RCR.",  // 12
      ".R.R.RCR.",  // 13
      ".R.R.RCR.",  // 14
      ".R.R.RCR.",  // 15
      ".G.G.G.C.",  // 16 car 4 can finally proceed
      ".G.G.G.GC",  // 17
      ".G.G.G.G.",  // 18
    ];
    
    doTest(sim[0], sim, n);
  });
  
  it('Worst lights ever', () => {
    let n = 51;
    let sim = [
      "CCCCR.G.R.",  // 0 4 cars all waiting at red lights
      "CCCCR.G.R.",  // 1
      "CCCCR.G.R.",  // 2
      "CCCCR.G.R.",  // 3
      "CCCCR.G.R.",  // 4
      ".CCCC.O.G.",  // 5 light turns green - car 1 proceeds
      ".CCCGCR.G.",  // 6
      ".CCCGCR.G.",  // 7 car 1 now stuck at red light - nobody can move
      ".CCCGCR.G.",  // 8
      ".CCCGCR.G.",  // 9
      ".CCCOCR.O.",  // 10
      ".CCCR.C.R.",  // 11 red light now stops cars 2,3,4
      ".CCCR.GCR.",  // 12
      ".CCCR.GCR.",  // 13 everybody at red lights
      ".CCCR.GCR.",  // 14 
      ".CCCR.GCR.",  // 15 
      "..CCC.O.C.",  // 16 light goes green - cars move
      "..CCGCR.GC",  // 17 light goes green - cars move
      "..CCGCR.G.",  // 18 car 1 finally leaves the road - others remain stuck
      "..CCGCR.G.",  // 19 
      "..CCGCR.G.",  // 20
      "..CCOCR.O.",  // 21
      "..CCR.C.R.",  // 22 car 2 proceeds
      "..CCR.GCR.",  // 23 
      "..CCR.GCR.",  // 24 all at red lights again...
      "..CCR.GCR.",  // 25
      "..CCR.GCR.",  // 26
      "...CC.O.C.",  // 27 lights go green - cars move
      "...CGCR.GC",  // 28
      "...CGCR.G.",  // 29 car 2 leaves the road - others still stuck
      "...CGCR.G.",  // 30
      "...CGCR.G.",  // 31
      "...COCR.O.",  // 32
      "...CR.C.R.",  // 33 car 3 proceeds...
      "...CR.GCR.",  // 34
      "...CR.GCR.",  // 35 all at red lights again...
      "...CR.GCR.",  // 36
      "...CR.GCR.",  // 37
      "....C.O.C.",  // 38 lights go green - cars move
      "....GCR.GC",  // 39
      "....GCR.G.",  // 40 car 3 leaves the road - car 4 at red light 
      "....GCR.G.",  // 41
      "....GCR.G.",  // 42
      "....OCR.O.",  // 43
      "....R.C.R.",  // 44 light goes green - car 4 proceeds
      "....R.GCR.",  // 45
      "....R.GCR.",  // 46 car 4 stuck at red light again
      "....R.GCR.",  // 47
      "....R.GCR.",  // 48
      "....G.O.C.",  // 49 light goes green - car 4 proceeds
      "....G.R.GC",  // 50
      "....G.R.G.",  // 51 FINALLY - car 4 leaves the road. Phew!!
    ];
    
    doTest(sim[0], sim, n);
  });
});


describe('Random tests', () => {

  // -------- SOLUTION --------
  
  class TrafficUnitRef {
    constructor(type) {
      this.display = ".C".includes(type) ? '.' : type;
      this.iteration = 0;
      this.intervals = { 'R': 5, 'G': 5, 'O': 1 };
    }
    
    iterate() {
      if (this.display === '.') return;  // No need to do anything with road pieces
      this.iteration++;
      if (this.iteration === this.intervals[this.display]) {
        this.iteration = 0;
        this.display = { 'R': 'G', 'G': 'O', 'O': 'R' }[this.display];
      }
    }
  }
  
  function trafficLightsRef(road, n) {
    const result = [road];
    const cars = [...Array(road.length)].map((_, i) => i).filter(i => road[i] === 'C').reverse();
    const traffic = [...road].map(u => new TrafficUnitRef(u));
    for (let i = 0; i < n; i++) {
      for (const unit of traffic) unit.iterate();
      for (let j = 0; j < cars.length; j++) {
        if (cars[j] === road.length - 1) cars[j] = Infinity;
        let pos = cars[j];
        if (pos > road.length) continue;
        cars[j] += ".G".includes(traffic[pos+1].display) && !cars.includes(pos+1) && !(traffic[pos+1].display == 'G' && cars.includes(pos+2)) ? 1 : 0;
      }
      result.push(traffic.map((u, i) => cars.includes(i) ? 'C' : u.display).join``);
    }
    return result;
  }

   // -------- END OF SOLUTION -------- 
   
   
  const randInt = (a, b) => Math.random() * (b - a + 1) + a | 0;
  
  function makeRandomRoad() {
    let roadLen = randInt(10, 20);
    let road = Array(roadLen).fill('.');
    // Add lights
    for (let i = 1; i < road.length; i++) {
      if (road[i - 1] === '.' && Math.random() < 0.2) {
        road[i] = Math.random() < 0.5 ? 'R' : 'G';
      }
    }
    // Add some cars
    for (let i = 0; i < road.length; i++) {
      if (road[i] === '.') {
        road[i] = 'C';
      } else {
        break;  // Only add cars up to the first light. Consider adding with 70% chance?
      }
    }
    return road.join('');
  }
  
  for (let i = 1; i <= 100; i++) {
    it(`Random test #${i}`, () => {
      let n = randInt(0, 50);
      let road = makeRandomRoad();
      let expected = trafficLightsRef(road, n);
      doTest(road, expected, n);
    });
  }
});