export type OSType = 'windows' | 'osx' | 'linux'
export type ClientProvider = 'Vanilla' | 'Fabric' | 'Forge'

export type ForgeVersionsType = {
  metadata: {
    groupId: string
    artifactId: string
    versioning: {
      release: string
      latest: string
      lastUpdated: number
      versions: {
        version: string[]
      }
    }
  }
}

export type StringRecord = Record<string, string>

export type NotIncludeCP = {
  notIncludeCP?: boolean
}

export type RuleType = {
  action: 'allow' | 'disallow'
  features: Record<string, any>
  os: StringRecord
}

export type GameRuleValueType = {
  rules: RuleType
  value: string[]
}

export type MojangResourceType = {
  id?: string
  path?: string
  sha1?: string
  size: number
  totalSize?: number
  url: string
}

export type LibraryType = NotIncludeCP & {
  downloads?: {
    artifact?: MojangResourceType
    classifiers?: {
      'natives-linux'?: MojangResourceType
      'natives-macos'?: MojangResourceType
      'natives-osx'?: MojangResourceType
      'natives-windows'?: MojangResourceType
    }
  }
  extract?: {
    exclude: string[]
  }
  serverreq?: boolean
  clientreq?: boolean
  natives?: StringRecord
  name?: string
  url?: string
  rules?: RuleType[]
}

export type VersionJsonType = {
  arguments?: {
    game: (string | GameRuleValueType)[]
    jvm?: (string | GameRuleValueType)[]
  }
  addCP?: string[]
  minecraftArguments?: string
  assetIndex: MojangResourceType
  assets: string
  complianceLevel: number
  downloads: Record<string, MojangResourceType>
  id: string
  javaVersion?: {
    component: string
    majorVersion: number
  }
  libraries: LibraryType[]
  logging?: {
    client: {
      argument: string
      file: MojangResourceType
      type: string
    }
  }
  mainClass: string
  minimumLauncherVersion?: number
  releaseTime: string
  time: string
  type: string
  inheritsFrom?: string
}

export type NewProfileJsonType = {
  spec?: number
  profile?: string
  version?: string
  path?: string | null
  minecraft?: string
  serverJarPath?: string
  data?: object
  processors?: object[]
  libraries: LibraryType[]
  icon?: string
  json?: string
  logo?: string
  mirrorList?: string
  welcome?: string
}

export type OldProfileJsonType = {
  install?: {
    profileName?: string
    target?: string
    path?: string
    version?: string
    filePath?: string
    welcome?: string
    minecraft?: string
    mirrorList?: string
    logo?: string
    modList?: string
  }
  versionInfo: VersionJsonType
}

export type ProfileJsonType = OldProfileJsonType | NewProfileJsonType

export type RequireOne<T, K extends keyof T> = {
  [X in Exclude<keyof T, K>]?: T[X]
} & {
  [P in K]-?: T[P]
}

export type AssetUnit = RequireOne<DownloadableResource, 'hash'>

export type AssetIndexType = {
  objects: Record<string, AssetUnit>[]
}

export type DownloadableResource = {
  size?: number
  url: string
  hash?: string
}
