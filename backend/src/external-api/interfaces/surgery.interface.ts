export interface Surgery {
  seq: number
  agdSeq: number
  nroAgenda: number
  unfSeq: number
  espSeq: number
  pacCodigo: number
  situacao: string
  naturezaAgend: string
  data: string
  dthrPrevInicio: string | null
  dthrPrevFim: string | null
  dthrInicioAnest: string | null
  dthrInicioCirg: string | null
  dthrFimAnest: string | null
  dthrFimCirg: string | null
  atdSeq: number
  criadoEm: string
  especialidade: {
    seq: number
    sigla: string
  }
}
