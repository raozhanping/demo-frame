{
  "targets": [
    {
      "target_name": "addon",
      "sources": ["./nodejs/hello.cc"],
      "defines": [
        "NODE_GYP_MODULE_NAME=addon"
      ]
    }
  ]
}
