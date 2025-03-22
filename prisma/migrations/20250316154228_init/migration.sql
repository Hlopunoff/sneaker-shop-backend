-- CreateTable
CREATE TABLE "products" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "brand_id" INTEGER NOT NULL,
    "category_id" INTEGER NOT NULL,
    "currentPrice" INTEGER NOT NULL,
    "oldPrice" INTEGER,
    "badge_id" INTEGER,
    "isPopular" BOOLEAN NOT NULL DEFAULT false,
    "isFavorite" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "brands" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "brands_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categories" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "badges" (
    "id" SERIAL NOT NULL,
    "background_color" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "text" TEXT NOT NULL,

    CONSTRAINT "badges_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "images" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "product_id" INTEGER NOT NULL,

    CONSTRAINT "images_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_info" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "product_id" INTEGER NOT NULL,

    CONSTRAINT "product_info_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_details" (
    "id" SERIAL NOT NULL,
    "info" TEXT NOT NULL,
    "title" TEXT,
    "product_info_id" INTEGER,

    CONSTRAINT "product_details_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "configurations" (
    "id" SERIAL NOT NULL,
    "colors_id" INTEGER NOT NULL,
    "sizes_id" INTEGER NOT NULL,
    "product_id" INTEGER,

    CONSTRAINT "configurations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "colors" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "colors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "color_value" (
    "id" SERIAL NOT NULL,
    "color" TEXT NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "color_value_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "color_value_on_color" (
    "colorId" INTEGER NOT NULL,
    "colorValueId" INTEGER NOT NULL,

    CONSTRAINT "color_value_on_color_pkey" PRIMARY KEY ("colorId","colorValueId")
);

-- CreateTable
CREATE TABLE "sizes" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "sizes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "size_values" (
    "id" SERIAL NOT NULL,
    "value" INTEGER NOT NULL,

    CONSTRAINT "size_values_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "size_value_on_size" (
    "sizeId" INTEGER NOT NULL,
    "sizeValueId" INTEGER NOT NULL,

    CONSTRAINT "size_value_on_size_pkey" PRIMARY KEY ("sizeId","sizeValueId")
);

-- CreateIndex
CREATE UNIQUE INDEX "brands_name_key" ON "brands"("name");

-- CreateIndex
CREATE UNIQUE INDEX "categories_name_key" ON "categories"("name");

-- CreateIndex
CREATE UNIQUE INDEX "configurations_colors_id_key" ON "configurations"("colors_id");

-- CreateIndex
CREATE UNIQUE INDEX "configurations_sizes_id_key" ON "configurations"("sizes_id");

-- CreateIndex
CREATE UNIQUE INDEX "configurations_product_id_key" ON "configurations"("product_id");

-- CreateIndex
CREATE UNIQUE INDEX "color_value_color_key" ON "color_value"("color");

-- CreateIndex
CREATE UNIQUE INDEX "color_value_value_key" ON "color_value"("value");

-- CreateIndex
CREATE UNIQUE INDEX "size_values_value_key" ON "size_values"("value");

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_brand_id_fkey" FOREIGN KEY ("brand_id") REFERENCES "brands"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_badge_id_fkey" FOREIGN KEY ("badge_id") REFERENCES "badges"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "images" ADD CONSTRAINT "images_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_info" ADD CONSTRAINT "product_info_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_details" ADD CONSTRAINT "product_details_product_info_id_fkey" FOREIGN KEY ("product_info_id") REFERENCES "product_info"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "configurations" ADD CONSTRAINT "configurations_colors_id_fkey" FOREIGN KEY ("colors_id") REFERENCES "colors"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "configurations" ADD CONSTRAINT "configurations_sizes_id_fkey" FOREIGN KEY ("sizes_id") REFERENCES "sizes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "configurations" ADD CONSTRAINT "configurations_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "color_value_on_color" ADD CONSTRAINT "color_value_on_color_colorId_fkey" FOREIGN KEY ("colorId") REFERENCES "colors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "color_value_on_color" ADD CONSTRAINT "color_value_on_color_colorValueId_fkey" FOREIGN KEY ("colorValueId") REFERENCES "color_value"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "size_value_on_size" ADD CONSTRAINT "size_value_on_size_sizeId_fkey" FOREIGN KEY ("sizeId") REFERENCES "sizes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "size_value_on_size" ADD CONSTRAINT "size_value_on_size_sizeValueId_fkey" FOREIGN KEY ("sizeValueId") REFERENCES "size_values"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
