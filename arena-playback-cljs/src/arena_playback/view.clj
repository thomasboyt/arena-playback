(ns arena-playback.view
  (:use [hiccup core page]))

(defn index-page []
  (html5
    [:head
      [:title "Arena Playback"]
      (include-js "/javascripts/main.js")]
    [:body "Test"]))