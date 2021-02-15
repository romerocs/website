## LAYOUT PRIMITIVES

## Markup

Stack

```html
<div class="l-stack">
  <div><!-- child --></div>
  <div><!-- child --></div>
  <div><!-- etc --></div>
</div>
```

Cluster

```html
<div class="l-cluster">
  <div>
    <!-- intermediary wrapper -->
    <div><!-- child --></div>
    <div><!-- child --></div>
    <div><!-- etc --></div>
  </div>
</div>
```

Center

```html
<div class="l-center"><!-- centered content --></div>
```

Box

```html
<div class="l-box"><!-- the box's contents --></div>
```

Sidebar

```html
<div class="l-has-sidebar">
  <div>
    <!-- intermediary wrapper -->
    <div><!-- sidebar --></div>
    <div class="not-sidebar"><!-- non-sidebar --></div>
  </div>
</div>
```

Grid

```html
<div class="grid">
  <div><!-- child element --></div>
  <div><!-- another child element --></div>
  <div><!-- etc --></div>
</div>
```

Switcher

```html
<div class="l-switcher">
  <div>
    <!-- intermediary wrapper -->
    <div>first</div>
    <div>second</div>
    <div>third</div>
  </div>
</div>
```

Icon

```html
<span class="l-has-icon">
  <svg class="icon"></svg>
  Close
</span>
```
