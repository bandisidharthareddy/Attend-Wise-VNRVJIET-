const saveBtn =
  document.getElementById("saveBtn");

const endDateInput =
  document.getElementById("endDate");

const bunkInput =
  document.getElementById("bunkInput");

const projectionResult =
  document.getElementById(
    "projectionResult"
  );

const holidayContainer =
  document.getElementById(
    "holidayContainer"
  );

const workingDayContainer =
  document.getElementById(
    "workingDayContainer"
  );

const addHolidayBtn =
  document.getElementById(
    "addHolidayBtn"
  );

const addWorkingBtn =
  document.getElementById(
    "addWorkingBtn"
  );


// -----------------------------------
// CREATE DATE INPUT
// -----------------------------------

function createDateInput(
  container,
  value = ""
) {

  const input =
    document.createElement("input");

  input.type = "date";

  input.className = "dateEntry";

  input.value = value;

  container.appendChild(input);

}


// -----------------------------------
// ADD BUTTONS
// -----------------------------------

addHolidayBtn.addEventListener(
  "click",
  () => {

    createDateInput(
      holidayContainer
    );

  }
);

addWorkingBtn.addEventListener(
  "click",
  () => {

    createDateInput(
      workingDayContainer
    );

  }
);


// -----------------------------------
// SAVE SETTINGS
// -----------------------------------

saveBtn.addEventListener(
  "click",
  () => {

    const holidays =
      Array.from(
        holidayContainer.querySelectorAll(
          "input"
        )
      ).map(i => i.value);

    const extraDays =
      Array.from(
        workingDayContainer.querySelectorAll(
          "input"
        )
      ).map(i => i.value);

    chrome.storage.local.set({

      semesterEnd:
        endDateInput.value,

      holidays,

      extraDays

    });

    alert(
      "Settings save ayyayi ra :)"
    );

  }
);


// -----------------------------------
// LOAD SETTINGS
// -----------------------------------

chrome.storage.local.get(

  [
    "semesterEnd",
    "holidays",
    "extraDays"
  ],

  (result) => {

    if (result.semesterEnd) {

      endDateInput.value =
        result.semesterEnd;

    }

    if (result.holidays) {

      result.holidays.forEach(date => {

        createDateInput(
          holidayContainer,
          date
        );

      });

    }

    if (result.extraDays) {

      result.extraDays.forEach(date => {

        createDateInput(
          workingDayContainer,
          date
        );

      });

    }

  }

);


// -----------------------------------
// MAIN LOGIC
// -----------------------------------

chrome.tabs.query(

  {
    active: true,
    currentWindow: true
  },

  (tabs) => {

    const currentTab = tabs[0];

    if (
      !currentTab.url.includes(
        "automation.vnrvjiet.ac.in"
      )
    ) {

      document.getElementById(
        "attendanceBox"
      ).innerHTML =
        "Portal open chey ra babu :/";

      return;

    }

    chrome.scripting.executeScript(

      {

        target: {
          tabId: currentTab.id
        },

        func: () => {

          const text =
            document.body.innerText;

          const matches = [

            ...text.matchAll(
              /(\d+)\s*\/\s*(\d+)\s*\((\d+\.\d+)\)/g
            )

          ];

          if (matches.length === 0) {

            return null;

          }

          const last =
            matches[
              matches.length - 1
            ];


          // -----------------------------------
          // TIMETABLE
          // -----------------------------------

          const table =
            document.querySelector("table");

          const rows =
            table.querySelectorAll("tr");

          const excluded = [

            "LIBRARY",
            "ECA",
            "CCA",
            "MTP"

          ];

          const weeklyPeriods = {};

          rows.forEach((row, index) => {

            if (index === 0) return;

            const cols =
              row.querySelectorAll("td");

            if (cols.length === 0) return;

            const day =
              cols[0]
                .innerText
                .trim();

            let count = 0;

            cols.forEach((col, i) => {

              if (i === 0) return;

              const subject =
                col.innerText
                  .trim()
                  .toUpperCase();

              if (

                subject &&

                !excluded.some(e =>
                  subject.includes(e)
                )

              ) {

                count++;

              }

            });

            weeklyPeriods[day] =
              count;

          });

          return {

            attended:
              parseInt(last[1]),

            total:
              parseInt(last[2]),

            percentage:
              parseFloat(last[3]),

            weeklyPeriods

          };

        }

      },

      (results) => {

        const data =
          results[0].result;

        if (!data) {

          document.getElementById(
            "attendanceBox"
          ).innerHTML =
            "Attendance dorakaledu T_T";

          return;

        }

        chrome.storage.local.get(

          [
            "semesterEnd",
            "holidays",
            "extraDays"
          ],

          (storage) => {

            let estimatedPeriods = 0;

            if (storage.semesterEnd) {

              const today =
                new Date();

              const end =
                new Date(
                  storage.semesterEnd
                );

              const current =
                new Date(today);

              while (current <= end) {

                const dateString =
                  current
                    .toISOString()
                    .split("T")[0];

                const weekday =
                  current.toLocaleDateString(
                    "en-US",
                    {
                      weekday: "long"
                    }
                  );

                let valid =
                  weekday !== "Sunday";

                // Holidays
                if (

                  storage.holidays &&
                  storage.holidays.includes(
                    dateString
                  )

                ) {

                  valid = false;

                }

                // Extra working days
                if (

                  storage.extraDays &&
                  storage.extraDays.includes(
                    dateString
                  )

                ) {

                  valid = true;

                }

                if (valid) {

                  estimatedPeriods +=

                    data.weeklyPeriods[
                      weekday
                    ] || 0;

                }

                current.setDate(
                  current.getDate() + 1
                );

              }

            }


            // -----------------------------------
            // SAFE BUNK RANGE
            // -----------------------------------

            const theoreticalMax =

              Math.floor(

                (
                  (
                    data.attended +
                    estimatedPeriods
                  ) / 0.75
                ) -

                (
                  data.total +
                  estimatedPeriods
                )

              );

            const safeMin =
              Math.floor(
                theoreticalMax * 0.80
              );

            const safeMax =
              Math.floor(
                theoreticalMax * 0.90
              );


            // -----------------------------------
            // MAIN TROLLS
            // -----------------------------------

            const trolls90 = [

              "Attendance antey family business aa :)",

              "Nuv class ki velthe lecturer attendance improve avtundi :0",

              "Bro timetable ni wallpaper ga pettukunnada :/",

              "Nee attendance chusi proxy kuda inspire ayyindi :)",

              "Bunk ki bayapadevadivi engineering enduku ra T_T",

              "Staff ki nuv permanent fixture laga aipoyav :0",

              "Home kanna classroom lo ekkuva memories unnai neeku :)"

            ];

            const trolls80 = [

              "Safe game aadthunnav kani inside lo bhayam kanipistundi :)",

              "Attendance maintain chesthunav gani happiness maintain chesthunava :0",

              "Nuv bunk kodithe universe balance disturb avtundi :/",

              "Low attendance vallatho mingle avvadam start chey T_T",

              "Risk tiskovali ra life lo konchem :)",

              "Inka konchem attendance perigite HOD autograph adugutharu :0"

            ];

            const trolls75 = [

              "One more bunk and academic villain arc start :0",

              "Nee attendance edge meeda tea tagutundi :/",

              "Nuv ippudu academic tightrope walk chesthunnav T_T",

              "Bunk kodithe thrill, attendance chusthe fear :)",

              "75 cross ayyaka life settled anukunnaava :0",

              "Nee attendance ki oxygen support almost ready :/"

            ];

            const trollsLow = [

              "HOD room lo nee kosam chair reserve undi :)",

              "Attendance kaadhu survival documentary idi :0",

              "Nee ID card chusi staff sigh chestharu :/",

              "Bro attendance ni side quest laga ignore chesadu T_T",

              "Internal marks already farewell cheppayi :)",

              "Nee attendance graph crypto market laga undi :0",

              "Classroom ki nuv guest appearance istunnav :/"

            ];


            let trollPool = [];

            if (data.percentage >= 90) {

              trollPool = trolls90;

            }

            else if (data.percentage >= 80) {

              trollPool = trolls80;

            }

            else if (data.percentage >= 75) {

              trollPool = trolls75;

            }

            else {

              trollPool = trollsLow;

            }

            const troll =

              trollPool[
                Math.floor(
                  Math.random() *
                  trollPool.length
                )
              ];


            // -----------------------------------
            // MAIN UI
            // -----------------------------------

            document.getElementById(
              "attendanceBox"
            ).innerHTML = `

              <div class="bigAttendance">

                ${data.percentage}%

              </div>

              <div class="safeRange">

                ${safeMin}
                -
                ${safeMax}

              </div>

              <p>
                safe bunk periods :)
              </p>

              <div class="troll">

                ${troll}

              </div>

            `;


            // -----------------------------------
            // PROJECTION SIMULATOR
            // -----------------------------------

            bunkInput.max =
              theoreticalMax;

            bunkInput.addEventListener(
              "input",
              () => {

                let bunkCount =
                  parseInt(
                    bunkInput.value || 0
                  );

                if (
                  bunkCount > theoreticalMax
                ) {

                  bunkCount =
                    theoreticalMax;

                  bunkInput.value =
                    theoreticalMax;

                }

                const projectedAttendance =

                  (
                    (
                      data.attended /
                      (
                        data.total +
                        bunkCount
                      )
                    ) * 100
                  ).toFixed(2);

                let projectionTrollPool = [];

                if (projectedAttendance >= 95) {

                  projectionTrollPool = [

                    "Dream big annaru... nuv attendance ni NASA ki pampisthunnav :)",

                    "Classroom ki biometric petti neetho start chestharu emo :0",

                    "Mem mimmalni ekkadiko tiskellali anukuntam... meremo front bench lone settle aipoyaru :/",

                    "Nuv class ki regular ga velthe lecturer confidence perigipotundi T_T",

                    "Attendance ni side quest kaakunda main story chesav :)"

                  ];

                }

                else if (projectedAttendance >= 90) {

                  projectionTrollPool = [

                    "Mem mimmalni ekkadiko tiskellali anukuntam... meremo direct class ki ostharu :0",

                    "Bro timetable ni family member laga treat chestunnadu :/",

                    "Bunk antey dictionary lo chusava atleast :)",

                    "Nuv absent aithe staff attendance verify chestharu T_T",

                    "Class ki inta dedication relationship lo kuda undadhu :)"

                  ];

                }

                else if (projectedAttendance >= 85) {

                  projectionTrollPool = [

                    "Safe ga aadthunnav kani overaction konchem ekkuva :0",

                    "Nuv class ki regular ga velthe staff ki motivation ostundi :/",

                    "Attendance maintain chesthunav gani happiness maintain chesthunava :)",

                    "Risk tiskovali ra life lo konchem T_T",

                    "Inka konchem attendance perigite HOD autograph adugutharu :)"

                  ];

                }

                else if (projectedAttendance >= 80) {

                  projectionTrollPool = [

                    "Abdul Kalam kalalu kanamannaru... nuv bunk dreams chustunnav :/",

                    "Safe zone lo untu risky thoughts enti ra :)",

                    "Nuv bunk plan chesthe attendance silent ga edustundi T_T",

                    "Bunk ki mundu attendance ni kuda okasari adugu :0",

                    "Low attendance batch tho friendship start chey :)"

                  ];

                }

                else if (projectedAttendance >= 75) {

                  projectionTrollPool = [

                    "Idi attendance aa ledha crypto graph aa T_T",

                    "One more bunk and academic villain arc start :0",

                    "Edge meeda nilchuni inka jump cheddam antunnav :/",

                    "Attendance ki oxygen support almost ready :)",

                    "Survival mode lo unna kuda bunk thoughts aagatledu T_T"

                  ];

                }

                else if (projectedAttendance >= 70) {

                  projectionTrollPool = [

                    "Aasha ki haddu... siggu rendu levu :)",

                    "Bro attendance chusi HOD deep breath tiskunnaru :0",

                    "Nuv inka bunk plan chestunnava? confidence ki salute :/",

                    "Academic comeback kaadhu miracle kavali ippudu T_T",

                    "Attendance already ICU lo undi... nuv bill adugutunnav :)"

                  ];

                }

                else {

                  projectionTrollPool = [

                    "Nee attendance ki last seen kuda kanapadatledu :0",

                    "Classroom ki nuv guest appearance istunnav :/",

                    "Internal marks already farewell cheppayi T_T",

                    "HOD room lo nee kosam chair reserve undi :)",

                    "Attendance ni side character laga treat chesav :0"

                  ];

                }

                const projectionTroll =

                  projectionTrollPool[
                    Math.floor(
                      Math.random() *
                      projectionTrollPool.length
                    )
                  ];

                projectionResult.innerHTML = `

                  Projected Attendance :0

                  <br><br>

                  <b>
                    ${projectedAttendance}%
                  </b>

                  <br><br>

                  ${projectionTroll}

                `;

              }
            );

          }

        );

      }

    );

  }

);