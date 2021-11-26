import { VictoryDiagramType } from "dashboard/model"
import { default as React } from "react"
import { VictoryBar, VictoryChart, VictoryTooltip } from "victory"

export interface VictoryBarDiagramProps {
  placesDistForVictory: VictoryDiagramType[]
  placesCategoriesForVictory: string[]
}

const getName = (name: string): string => {
  let fullName = ""
  if (name === "bib") fullName = "Bibliothèque"
  else if (name === "ceg") fullName = "Cégep"
  if (name === "cen") fullName = "Centre\n communautaire"
  if (name === "cin") fullName = "Cinéma"
  if (name === "égl") fullName = "Église"
  if (name === "gal") fullName = "Galerie\n d'art"
  if (name === "mai") fullName = "Maison de\n la culture"
  if (name === "mus") fullName = "Musée"
  if (name === "sal") fullName = "Salle de\n spectacle"
  if (name === "the") fullName = "Théâtre"
  return fullName
}

const MtlVictoryBarDiagram = (props: VictoryBarDiagramProps) => {
  return (
    <VictoryChart domainPadding={25}>
      <VictoryBar
        style={{ data: { fill: "#c43a31" } }}
        categories={{
          x: props.placesCategoriesForVictory
        }}
        data={props.placesDistForVictory}
        labels={({ datum }) => `${getName(datum.x)} : ${datum.y}`}
        labelComponent={
          //adding padding value in style or flyoutStyle doesn't seenm to work. So the width is fixed to 160
          <VictoryTooltip
            style={{ fontSize: "18" }}
            flyoutWidth={160}
            // // flyoutHeight={50}
            flyoutStyle={{ stroke: "#c43a31", strokeWidth: 2 }}
          />
        }
      />
    </VictoryChart>
  )
}

export default MtlVictoryBarDiagram
