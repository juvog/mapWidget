import { VictoryDiagramType } from "dashboard/model"
import { default as React } from "react"
import SoilLegend from "./SoilLegend"
import VictoryBarDiagram from "./VictoryBarDiagram"
import VictoryPieDiagram from "./VictoryPieDiagram"

interface FieldsTypeAnalysisProps {
  analysisChoice: string
}

interface FieldsTypeAnalysisState {
  soilsDistribution: VictoryDiagramType[]
}

export class FieldsTypeAnalysis extends React.Component<FieldsTypeAnalysisProps, FieldsTypeAnalysisState> {
  // public export public default public AnalyseTypeTerrain
  constructor(props: FieldsTypeAnalysisProps) {
    super(props)
    this.state = {
      soilsDistribution: []
    }
  }

  public componentDidMount() {
    console.log("composant mount")
    // populate graph on first mount
    this.getSoilDistribution()
    // register map move listener
    JMap.Event.Map.on.moveEnd("custom-map-move", () => {
      this.getSoilDistribution()
    })
  }

  // Existe mais ne sert pas - bon à savoir
  // public shouldComponentUpdate(nextProps: AnalyseTypeTerrainProps): boolean {
  //   // needed if we want to skip component update based on props comparison
  //   return true
  // }

  public componentDidUpdate(prevProps: FieldsTypeAnalysisProps) {
    // nothing for now
    // à utiliser avec un if/else (sinom boucle infini)  pour réinitialiser le state local
  }

  public componentWillUnmount() {
    console.log("composant unmount")
    JMap.Event.Map.remove("custom-map-move")
  }

  public render() {
    const { analysisChoice } = this.props
    const { soilsDistribution } = this.state
    // prepare data for Victory Chart and Victory Pie
    let fieldsAmount = 0
    const soilsDistForVictory = new Array<VictoryDiagramType>()
    soilsDistribution.forEach(t => {
      if (t.y !== 0) {
        const newElement: any = new Object()
        newElement.x = t.x
        newElement.y = t.y
        soilsDistForVictory.push(newElement)
        fieldsAmount += t.y
      }
    })
    const soilsCategoriesForVictory = new Array<string>()
    soilsDistForVictory.forEach(t => {
      soilsCategoriesForVictory.push(t.x)
    })

    return (
      <div>
        {analysisChoice === "fieldsDist" ? (
          <div>
            <VictoryBarDiagram soilsDistForVictory={soilsDistForVictory} soilsCategoriesForVictory={soilsCategoriesForVictory} />
            <SoilLegend />
          </div>
        ) : (
          <div>
            <VictoryPieDiagram fieldsAmount={fieldsAmount} soilsDistForVictory={soilsDistForVictory} />
            <SoilLegend />
          </div>
        )}
      </div>
    )
  }

  private getSoilDistribution() {
    let alluvions = 0
    let marecages = 0
    let nc = 0
    let solsArgileux = 0
    let solsGraveleux = 0
    let solsIDT = 0
    let solsLoameux = 0
    let solsOrganiques = 0
    let solsSableux = 0
    const type = "TYPE_SOL"
    JMap.Map.getRenderedFeatures(7)
      .map(f => f.properties?.[type] as string)
      .forEach(t => {
        if (t === "A") {
          alluvions++
        } else if (t === "Mar�cages") {
          marecages++
        } else if (t === "n.d." || t === "P-a") {
          nc++
        } else if (
          t === "Bb" ||
          t === "Cv" ||
          t === "D" ||
          t === "R-s" ||
          t === "R" ||
          t === "R+Spl" ||
          t === "Ro+Cv" ||
          t === "Rol" ||
          t === "RS" ||
          t === "Rol+Dm"
        ) {
          solsArgileux++
        } else if (t === "Ph") {
          solsGraveleux++
        } else if (
          t === "Bn" ||
          t === "Bn+D" ||
          t === "Bnl" ||
          t === "L" ||
          t === "P" ||
          t === "Pg" ||
          t === "Rg" ||
          t === "Rg+Mar�cages"
        ) {
          solsIDT++
        } else if (t === "B" || t === "BI" || t === "Bs" || t === "S-a" || t === "S" || t === "SI" || t === "Z-a" || t === "Z") {
          solsLoameux++
        } else if (t === "Bp" || t === "M" || t === "T") {
          solsOrganiques++
        } else if (
          t === "Am" ||
          t === "C" ||
          t === "Dm" ||
          t === "Dm+Ro" ||
          t === "J" ||
          t === "Sp" ||
          t === "Spl" ||
          t === "U" ||
          t === "Ug" ||
          t === "V"
        ) {
          solsSableux++
        }
      })

    this.setState({
      soilsDistribution: [
        { x: "all", y: alluvions },
        { x: "arg", y: solsArgileux },
        { x: "gra", y: solsGraveleux },
        { x: "idt", y: solsIDT },
        { x: "loa", y: solsLoameux },
        { x: "mar", y: marecages },
        { x: "nc", y: nc },
        { x: "org", y: solsOrganiques },
        { x: "sab", y: solsSableux }
      ]
    })
  }
}
