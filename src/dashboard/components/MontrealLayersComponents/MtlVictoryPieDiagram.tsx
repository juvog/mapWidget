import { VictoryDiagramType } from "dashboard/model"
import { default as React } from "react"
import { VictoryLabel, VictoryPie } from "victory"

export interface VictoryPieDiagramProps {
  placesDistForVictory: VictoryDiagramType[]
  placesAmount: number
}

const getName = (name: string): string => {
  let fullName = ""
  if (name === "bib") fullName = "Bibliothèques"
  else if (name === "ceg") fullName = "Cégep"
  if (name === "cen") fullName = "Centres\n communautaire"
  if (name === "cin") fullName = "Cinémas"
  if (name === "égl") fullName = "Églises"
  if (name === "gal") fullName = "Galeries\n d'art"
  if (name === "mai") fullName = "Maisons de\n la culture"
  if (name === "mus") fullName = "Musées"
  if (name === "sal") fullName = "Salles de\n spectacle"
  if (name === "the") fullName = "Théâtres"
  return fullName
}

const MtlVictoryPieDiagram = (props: VictoryPieDiagramProps) => {
  const placesAmountValue = props.placesAmount

  return (
    <div>
      <h3 id="onMouseOverData" style={{ fontSize: 15, color: "red", fontWeight: "normal" }}>
        <br></br>
      </h3>

      <VictoryPie
        labels={({ datum }) => `${datum.x}`}
        labelComponent={<VictoryLabel />}
        colorScale={["tomato", "orange", "gold", "cyan", "navy", "brown"]}
        data={props.placesDistForVictory}
        style={{
          data: {
            stroke: "grey",
            strokeWidth: 1
          }
        }}
        events={[
          {
            target: "data",
            eventHandlers: {
              onMouseOver: () => {
                return [
                  {
                    target: "labels",
                    mutation: props => {
                      const fill = props.style.fill
                      const fullName = getName(props.datum.x)
                      const percDatum = Math.round((props.datum.y / placesAmountValue) * 100) as number
                      let container = document.getElementById("onMouseOverData")
                      container!.innerHTML = fullName + ": " + percDatum + "%"
                      return {
                        style: { fill: "tomato", fontSize: 16 },
                        // text: percDatum + " %"
                        text: props.datum.x
                      }
                    }
                  }
                ]
              },
              onMouseOut: () => {
                return [
                  {
                    target: "labels",
                    mutation: props => {
                      let container = document.getElementById("onMouseOverData")
                      container!.innerHTML = ""
                      return null
                    }
                  }
                ]
              }
            }
          }
        ]}
      />
    </div>
  )
}

export default MtlVictoryPieDiagram
