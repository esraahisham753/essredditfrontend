import { Pipe, PipeTransform } from "@angular/core";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import createDOMPurify from "dompurify";

@Pipe({
    name: 'safeHTML',
    standalone: true
})
export class SafeHTMLPipe implements PipeTransform {
    private purifier: { sanitize: (html: string) => string };

    constructor(private sanitizer: DomSanitizer) {
        if (typeof window !== "undefined" && createDOMPurify) {
            // @ts-ignore
            this.purifier = (createDOMPurify as any)(window);
        } else {
            this.purifier = { sanitize: (s: string) => s };
        }
    }

    transform(value: String): SafeHtml {
        let cleanHTML = this.purifier.sanitize("" + value);

        if (typeof window !== "undefined") {
            const container = document.createElement("div");
            container.innerHTML = cleanHTML;

            container.querySelectorAll('img').forEach(img => {
                img.removeAttribute("width");
                img.removeAttribute("height");
                img.style.removeProperty("width");
                img.style.removeProperty("height");
            });

            cleanHTML = container.innerHTML;
        }
        
        return this.sanitizer.bypassSecurityTrustHtml(cleanHTML);
    }
    
}