import { CommonStore } from "./abstract-store";
import type { Store } from "./store";

export class MediaMarktSpain extends CommonStore implements Store {
    readonly baseUrl = "https://www.mediamarkt.es";
    readonly countryCode = "ES";
    readonly languageCode = "es";
    readonly salesLine = "Media";
    readonly shortCode = "mmes";
    readonly thumbnail = "https://www.mediamarkt.es/public/manifest/splashscreen-Media-512x512.png";

    getName(): string {
        return "MediaMarkt Spain";
    }

    getShortName(): string {
        return "MediaMarkt";
    }
}
