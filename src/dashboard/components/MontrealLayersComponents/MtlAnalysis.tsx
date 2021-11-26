import { VictoryDiagramType } from "dashboard/model"
import { default as React } from "react"
import MtlVictoryBarDiagram from "./MtlVictoryBarDiagram"
import MtlVictoryPieDiagram from "./MtlVictoryPieDiagram"
import PlacesLegend from "./PlacesLegend"

interface montrealPlacesAnalysisState {
  places: VictoryDiagramType[]
}

interface montrealPlacesAnalysisProps {
  analysisChoice: string
}

export class MtlAnalysis extends React.Component<montrealPlacesAnalysisProps, montrealPlacesAnalysisState> {
  // public export public default public AnalyseTypeTerrain
  constructor(props: any) {
    super(props)
    this.state = {
      places: []
    }
  }

  public componentDidMount() {
    console.log("composant mount")
    // populate graph on first mount
    // register map move listener
    this.getPlacesDistribution()
    JMap.Event.Map.on.moveEnd("custom-map-move", () => {
      this.getPlacesDistribution()
    })
  }

  // Existe mais ne sert pas - bon à savoir
  // public shouldComponentUpdate(nextProps: AnalyseTypeTerrainProps): boolean {
  //   // needed if we want to skip component update based on props comparison
  //   return true
  // }

  public componentDidUpdate(prevProps: any) {
    // nothing for now
    // à utiliser avec un if/else (sinom boucle infini)  pour réinitialiser le state local
  }

  public componentWillUnmount() {
    console.log("composant unmount")
    JMap.Event.Map.remove("custom-map-move")
  }

  public render() {
    // prepare data for Victory diagrams
    const { places } = this.state
    const { analysisChoice } = this.props
    let placesAmount = 0

    let placesCategoriesForVictory = new Array<string>()
    const placesDistForVictory = new Array<VictoryDiagramType>()

    places.forEach(t => {
      if (t.y !== 0) {
        const newElement: any = new Object()
        newElement.x = t.x
        newElement.y = t.y
        placesDistForVictory.push(newElement)
        placesAmount += t.y
      }
    })

    placesDistForVictory.forEach(t => {
      placesCategoriesForVictory.push(t.x)
    })

    return (
      <div>
        {analysisChoice === "sum" ? (
          <div style={{ padding: 20, color: "#c43a31" }}>
            <div> Nombre de lieux : {placesAmount} </div>
          </div>
        ) : analysisChoice === "placesDist" ? (
          <div>
            <MtlVictoryBarDiagram
              placesDistForVictory={placesDistForVictory}
              placesCategoriesForVictory={placesCategoriesForVictory}
            />
            <PlacesLegend />
          </div>
        ) : analysisChoice === "percPlacesDist" ? (
          <div>
            <MtlVictoryPieDiagram placesDistForVictory={placesDistForVictory} placesAmount={placesAmount} />
            <PlacesLegend />
          </div>
        ) : null}
      </div>
    )
  }

  private getPlacesDistribution() {
    let biblio = 0
    let cegep = 0
    let centreCom = 0
    let cinema = 0
    let eglise = 0
    let galerieArt = 0
    let maisonCulture = 0
    let musee = 0
    let salleSpectacle = 0
    let theatre = 0
    const name = "NOM_DU_LIE"
    JMap.Map.getRenderedFeatures(6)
      .map(f => f.properties?.[name])
      .filter(s => typeof s === "string")
      .forEach(t => {
        if ((t.substring(0, 3) as string) === "Bib" || (t.substring(0, 3) as string) === "Gra") {
          biblio++
        } else if ((t.substring(0, 3) as string) === "Cég") {
          cegep++
        } else if ((t.substring(0, 3) as string) === "Cen") {
          centreCom++
        } else if ((t.substring(0, 3) as string) === "Cin") {
          cinema++
        } else if ((t.substring(0, 3) as string) === "Égl") {
          eglise++
        } else if ((t.substring(0, 3) as string) === "Gal") {
          galerieArt++
        } else if ((t.substring(0, 3) as string) === "Mai" || (t.substring(0, 3) as string) === "Pav") {
          maisonCulture++
        } else if (
          (t.substring(0, 3) as string) === "Bio" ||
          (t.substring(0, 3) as string) === "Cha" ||
          (t.substring(0, 3) as string) === "Ins" ||
          (t.substring(0, 3) as string) === "Jar" ||
          (t.substring(0, 3) as string) === "Mus" ||
          (t.substring(0, 3) as string) === "Pla" ||
          (t.substring(0, 3) as string) === "Poi"
        ) {
          musee++
        } else if ((t.substring(0, 3) as string) === "Aud" || (t.substring(0, 3) as string) === "Sal") {
          salleSpectacle++
        } else if ((t.substring(0, 3) as string) === "Thé") {
          theatre++
        }
      })

    this.setState({
      places: [
        { x: "bib", y: biblio },
        { x: "ceg", y: cegep },
        { x: "cen", y: centreCom },
        { x: "cin", y: cinema },
        { x: "gal", y: galerieArt },
        { x: "mai", y: maisonCulture },
        { x: "mus", y: musee },
        { x: "sal", y: salleSpectacle },
        { x: "the", y: theatre }
      ]
    })
  }
}
