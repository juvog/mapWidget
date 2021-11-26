import { VictoryDiagramType } from "dashboard/model"
import { default as React } from "react"
import { VictoryLabel, VictoryPie } from "victory"

export interface VictoryPieDiagramProps {
  soilsDistForVictory: VictoryDiagramType[]
  fieldsAmount: number
}

const getName = (name: string): string => {
  let fullName = ""
  if (name === "all") fullName = "alluvions"
  else if (name === "arg") fullName = "sols argileux"
  if (name === "gra") fullName = "sols graveleux"
  if (name === "idt") fullName = "sols issus de dépôts tills"
  if (name === "loa") fullName = "sols loameux"
  if (name === "mar") fullName = " marécages"
  if (name === "org") fullName = "sols organiques"
  if (name === "sab") fullName = "sols sableux"
  if (name === "nc") fullName = "inconnu"
  return fullName
}

const VictoryPieDiagram = (props: VictoryPieDiagramProps) => {
  const fieldsAmountValue = props.fieldsAmount
  return (
    <div>
      <h3 id="onMouseOverData" style={{ fontSize: 15, color: "red", fontWeight: "normal" }}>
        <br></br>
      </h3>
      <VictoryPie
        labels={({ datum }) => `${datum.x}`}
        labelComponent={<VictoryLabel />}
        colorScale={["tomato", "orange", "gold", "cyan", "navy"]}
        data={props.soilsDistForVictory}
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
                      const percDatum = Math.round((props.datum.y / fieldsAmountValue) * 100) as number
                      const category = props.datum.x
                      let container = document.getElementById("onMouseOverData")
                      container!.innerHTML = getName(category) + " : " + percDatum + "%"
                      return { style: { fill: "tomato", fontSize: 16 }, text: percDatum + " %" }
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

export default VictoryPieDiagram
