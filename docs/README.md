# Peer Grading Tool

- **Kunde:** Eduard Klein (eduard.klein@bfh.ch) BFH Wirtschaft
- **Entwickler:** Kerrie Stauffer, Nick Soland
- **Entwicklungsdauer:** August - Dezember 2022 ([Open Project](https://openproject.prod.digisus-lab.ch/projects/bfh-w-peergradingtool/))

Das [Peer Grading Tool (PGT)](https://peer-grading-tool.dsl.digisus-lab.ch/) dient der gegenseitigen und eigenen Evaluation bei Gruppenarbeiten in Kursen an der BFH-W.

Es wurde mit Angular für das Frontend und Nest JS sowie Prisma fürs Backend umgesetzt.

## Ausgangslage

Im Kontext von Lehrveranstaltungen an der BFH-W wird zum Vergleich individueller Beiträge in Gruppenarbeiten Peer Grading eingesetzt, wobei jedes Gruppenmitglied (Peer) nach bestimmten Kriterien sowohl alle anderen Gruppenmitglieder als auch sich selbst bewertet und eine anonymisierte Auswertung erhält. Die Bewertungen erfolgen mit einer Punkteskala nach definierten Kriterien. Die derzeitige Excel-Lösung ist umständlich und der Einsatz zeitaufwändig.

## Ziele

- Das PGT soll als einfach zu bedienende Web-App die momentane Excel-Variante ablösen.
- Dozenten sollen die sogenannten Kampagnen in Sachen Zeitraum, Punkteskala, Kriterien sowie deren Gewichtung individualisieren können. Die Peers werden in Gruppen zusammengefasst.
- Das Erstellen der Kampagnen soll mittels CSV-Imports automatisiert werden können.
- Peers erfassen die Gradings mittels eines Links, den sie per E-Mail erhalten.
- Am Ende einer Kampagnen erhalten Peers eine anonymisierte Auswertung ihrer Gruppe und Dozenten eine Zusammenfassung der Kampagne per E-Mail
- Edi Klein kann im PGT die Admin-User (Dozenten) verwalten.

## Vorgehen

In vier Phasen:

1. View
   - Die Screens gestalten und Umsetzen in plain HTML/CSS
2. Frontend
   - Angular App entwickeln
   - Datenmodell Frontend
3. Backend
   - Datenbankmodelierung (Prisma)
   - Nest JS Endpoints
   - Authorisierung
   - Mails Auslösen
   - Export der Kampagenen als PDF
4. Weiterentwicklung (noch nicht begonnen)

## Learnings

Die benutzten Frameworks haben alle sehr nützliche Dokumentationen. Besonders Nest JS erlaubt für die Implementation von vielen Funktionen Schritt-für-Schritt-Anleitungen, welche die meisten Anforderungen abdecken.

### View

Beim Umsetzen von Screens sollte man die Mobile Ansicht bedenken bzw. sie gleich Mobile-First umsetzen.
Zuerst wurden nur vier Screens umgesetzt. Später kamen dann viele mehr hinzu. Bspw. ein Dashboard für die Admin-User oder ein Screen um das Profil zu bearbeiten. Man sollte von Anfang an alle erdenklichen Screens berücksichtigen.

### Endpoints

Das Frontend basierte zuerst komplett auf Klassen, wurde dann lediglich auf Interfaces reduziert, da der Austausch zwischen Front- und Backend nur JSON-Objekte erlaubt. Eine Typisierung ist auf jeden Fall von gutem Nutzen.

### Prisma

Prisma ist sehr typensicher. Es verlangt allerdings vom Dev viel Code zu schreiben, welcher sehr gewöhnungsbedürftig ist. Ausserdem ist von einer Datenbank in Form einer Datei abzuraten, da manche Prisma-Funktionen dafür nicht funktionieren.

## Verwendete Quellen

[Angular Dokumentation](https://angular.io/docs)

[Nest JS Dokumentation](https://docs.nestjs.com/)

[Prisma Dokumentation](https://www.prisma.io/docs)
