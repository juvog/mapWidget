import { default as React } from "react"

interface SimpleAnalysisProps {
  analysisChoice: string
}

interface SimpleAnalysisState {
  superficie: number[]
}

const sup = "HECTARES"

export class SimpleAnalysis extends React.Component<SimpleAnalysisProps, SimpleAnalysisState> {
  // public export public default public AnalyseTypeTerrain
  constructor(props: SimpleAnalysisProps) {
    super(props)
    this.state = {
      superficie: []
    }
  }

  public componentDidMount() {
    console.log("composant mount")
    // populate graph on first mount
    // register map move listener
    this.setState({ superficie: JMap.Map.getRenderedFeatures(7).map(f => f.properties?.[sup] as number) })
    JMap.Event.Map.on.moveEnd("custom-map-move", () => {
      this.setState({ superficie: JMap.Map.getRenderedFeatures(7).map(f => f.properties?.[sup] as number) })
    })
  }

  // Existe mais ne sert pas - bon à savoir
  // public shouldComponentUpdate(nextProps: AnalyseTypeTerrainProps): boolean {
  //   // needed if we want to skip component update based on props comparison
  //   return true
  // }

  public componentDidUpdate(prevProps: SimpleAnalysisProps) {
    // nothing for now
    // à utiliser avec un if/else (sinom boucle infini)  pour réinitialiser le state local
  }

  public componentWillUnmount() {
    console.log("composant unmount")
    JMap.Event.Map.remove("custom-map-move")
  }

  public render() {
    // Calculs du nombre de Terrains, somme et moyenne de la superficie des terrains
    const nbTerrains = this.state.superficie.length
    let somSuperficies = 0
    this.state.superficie.forEach(f => (somSuperficies += f))
    const moyenSuperficies = somSuperficies / nbTerrains
    return (
      <div style={{ padding: 20, color: "#c43a31" }}>
        <div> Nombre de terrains : {nbTerrains} </div>
        <div> Somme des superficies : {Math.round(somSuperficies * 10) / 10} ha </div>
        <div> Moyenne des superficies : {Math.round(moyenSuperficies * 10) / 10} ha </div>
      </div>
    )
  }
}
