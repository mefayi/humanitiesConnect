# humanitiesConnect

**humanitiesConnect** ist ein Tool zur Verwaltung und Überwachung von Digital Humanities-Projekten sowie anderen Projekten. Es bietet einen Live-Status-Checker für Webseiten und ermöglicht die Erweiterung der Datenübertragung durch Plugins, die verschiedene Datenquellen nutzen können.

## Inhaltsverzeichnis

- [Beschreibung](#beschreibung)
- [Installation](#installation)
- [Verwendung](#verwendung)
- [Technologien](#technologien)
- [Lizenz](#lizenz)
- [Autor](#autor)
- [Besonderheiten](#besonderheiten)

## Beschreibung

**humanitiesConnect** bietet eine Übersicht über Digital Humanities-Projekte und andere Projekte mit einem Live-Status-Checker für Webseiten. Das besondere an diesem Tool ist die Erweiterbarkeit der Datenübertragung durch Plugins, die die vorhandenen Electron IPCRenderer-Routen nutzen. Dadurch kann jede mögliche Datenquelle verwendet werden, indem man ein entsprechendes Plugin schreibt.

## Installation

Um das Projekt zu installieren, führen Sie die folgenden Schritte aus:

1. Klonen Sie das Repository:
   ```bash
   git clone https://github.com/mefayi/humanitiesConnect.git
   ```

2. Navigieren Sie in das Projektverzeichnis:
   ```bash
   cd humanitiesConnect
   ```

3. Installieren Sie die Abhängigkeiten:
   ```bash
   npm install
   ```

4. Starten Sie die Anwendung:
   ```bash
   npm run start
   ```

## Verwendung

**humanitiesConnect** verfügt über eine benutzerfreundliche Oberfläche. Nach dem Start der Anwendung können Sie:

- Projekte hinzufügen und verwalten.
- Den Live-Status von Projekt-Webseiten überprüfen.
- Plugins installieren, um Daten aus verschiedenen Quellen zu integrieren.

Die Bedienung erfolgt intuitiv über die grafische Benutzeroberfläche.

## Technologien

Das Projekt basiert auf den folgenden Technologien:

- [Electron.js](https://www.electronjs.org/)
- [Node.js](https://nodejs.org/)
- [React.js](https://reactjs.org/)

Eine Datenbank wird nicht verwendet; die Projektdaten werden in einer JSON-Datei gespeichert.

## Lizenz

Dieses Projekt steht unter der MIT-Lizenz. Weitere Informationen finden Sie in der [LICENSE](LICENSE) Datei.

## Autor

**Mehmet Fatih Yilmaz** (mefayi)

## Besonderheiten

- **JSON-Speicherung:** Alle Projektdaten werden in einer JSON-Datei gespeichert, was die Datenverwaltung vereinfacht.
- **Erweiterbarkeit durch Plugins:** Die Datenübertragung kann durch selbstgeschriebene Plugins erweitert werden, die die Electron IPCRenderer-Routen nutzen.