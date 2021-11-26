import { VictoryDiagramType } from "dashboard/model"
import { default as React } from "react"
import { VictoryBar, VictoryChart, VictoryTooltip } from "victory"

export interface VictoryBarDiagramProps {
  soilsDistForVictory: VictoryDiagramType[]
  soilsCategoriesForVictory: string[]
}

const getName = (name: string): string => {
  let fullName = ""
  if (name === "all") fullName = "alluvions"
  else if (name === "arg") fullName = "sols argileux"
  if (name === "gra") fullName = "sols graveleux"
  if (name === "idt") fullName = "sols issus de\n dépôts tills"
  if (name === "loa") fullName = "sols loameux"
  if (name === "mar") fullName = " marécages"
  if (name === "org") fullName = "sols\n organiques"
  if (name === "sab") fullName = "sols sableux"
  if (name === "nc") fullName = "inconnu"
  return fullName
}
const VictoryBarDiagram = (props: VictoryBarDiagramProps) => {
  return (
    <VictoryChart domainPadding={25}>
      <VictoryBar
        style={{ data: { fill: "#c43a31" } }}
        categories={{
          x: props.soilsCategoriesForVictory
        }}
        data={props.soilsDistForVictory}
        labels={({ datum }) => getName(datum.x) + ` : ${datum.y}`}
        labelComponent={
          <VictoryTooltip
            style={{ fontSize: "18" }}
            flyoutWidth={150}
            flyoutHeight={50}
            flyoutStyle={{ stroke: "#c43a31", strokeWidth: 2 }}
          />
        }
      />
    </VictoryChart>
  )
}

export default VictoryBarDiagram
