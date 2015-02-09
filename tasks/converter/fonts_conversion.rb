class Converter
  module FontsConversion
    def process_font_assets
      log_status 'Processing fonts...'
      # files   = read_files('fonts', bootstrap_font_files)
      path =  File.dirname(__FILE__) + '/../../fonts'
      files = Dir.entries(path).select{ |e| File.file? "#{path}/#{e}" and e =~ /\.(eot|svg|ttf|woff)$/}
      save_to = @save_to[:fonts]
      files.each do |name, content|
        save_file "#{save_to}/#{name}", content
      end
    end

    # def bootstrap_font_files
    #   @bootstrap_font_files ||= get_paths_by_type('fonts', /\.(eot|svg|ttf|woff)$/)
    # end
  end
end
